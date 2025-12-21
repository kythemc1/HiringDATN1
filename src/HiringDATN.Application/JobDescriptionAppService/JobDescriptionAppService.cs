using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Google;
using Microsoft.SemanticKernel.Memory;
using Volo.Abp.Application.Services;

namespace HiringDATN.Service;

/// <summary>
/// DTO dùng để hứng dữ liệu từ file JSON
/// </summary>
public class CompanyKnowledgeItem
{
    public string Topic { get; set; }   // Chủ đề (VD: Văn hóa, Lương thưởng)
    public string Content { get; set; } // Nội dung chi tiết
}

public class JobDescriptionAppService : ApplicationService
{
    private readonly Kernel _kernel;
    private readonly ISemanticTextMemory _memory;

    // Tên của "bảng" lưu trữ trong bộ nhớ Vector
    private const string MemoryCollectionName = "CompanyKnowledgeBase";

    public JobDescriptionAppService(Kernel kernel, ISemanticTextMemory memory)
    {
        _kernel = kernel;
        _memory = memory;
    }

    // =========================================================================
    // PHẦN 1: NẠP DỮ LIỆU (RAG INGESTION) - Chạy 1 lần khi khởi động hoặc User upload
    // =========================================================================
    public async Task<string> ImportCompanyKnowledgeAsync(string jsonFilePath)
    {
        if (!File.Exists(jsonFilePath))
        {
            throw new Exception($"Không tìm thấy file JSON tại đường dẫn: {jsonFilePath}");
        }

        try
        {
            // 1. Đọc nội dung file JSON
            string jsonContent = await File.ReadAllTextAsync(jsonFilePath);

            // 2. Chuyển đổi JSON thành danh sách đối tượng
            var knowledgeList = JsonSerializer.Deserialize<List<CompanyKnowledgeItem>>(jsonContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // Không phân biệt hoa thường
            });

            if (knowledgeList == null || knowledgeList.Count == 0)
            {
                return "File JSON rỗng hoặc sai định dạng.";
            }

            // 3. Lưu từng mục vào Semantic Memory (Vector Database)
            int count = 0;
            foreach (var item in knowledgeList)
            {
                // Tạo chuỗi văn bản kết hợp để AI hiểu ngữ cảnh tốt nhất
                // Format: [Chủ đề]: Nội dung
                string textToEmbed = $"[{item.Topic}]: {item.Content}";

                // SaveInformationAsync sẽ tự động gọi Google Embedding API để biến text thành Vector
                await _memory.SaveInformationAsync(
                    collection: MemoryCollectionName,
                    text: textToEmbed,
                    id: $"json_id_{count}", // ID duy nhất
                    description: item.Topic  // Mô tả bổ trợ (Optional)
                );
                count++;
            }

            return $"Thành công! Đã nạp {count} mục thông tin công ty vào bộ nhớ AI.";
        }
        catch (Exception ex)
        {
            throw new Exception($"Lỗi khi đọc file JSON: {ex.Message}");
        }
    }

    // =========================================================================
    // PHẦN 2: TẠO JD VỚI RAG (RETRIEVAL + GENERATION)
    // =========================================================================
    public async Task<string> GenerateJobDescriptionAsync(string jobTitle, string specificRequirements)
    {
        // --- BƯỚC 1: TRUY VẤN DỮ LIỆU (RETRIEVAL) ---
        // Ta sẽ tìm kiếm trong bộ nhớ những thông tin quan trọng cần có trong JD như: 
        // Văn hóa, Quyền lợi, Thời gian làm việc.

        // Tìm kiếm ngữ nghĩa (Semantic Search)
        var searchResults = _memory.SearchAsync(
            collection: MemoryCollectionName,
            query: "Văn hóa công ty chế độ đãi ngộ quyền lợi nhân viên thời gian làm việc",
            limit: 4, // Lấy 4 đoạn thông tin liên quan nhất
            minRelevanceScore: 0.5 // Chỉ lấy tin có độ tin cậy > 50%
        );

        StringBuilder contextBuilder = new StringBuilder();
        await foreach (var memory in searchResults)
        {
            contextBuilder.AppendLine($"- {memory.Metadata.Text}");
        }

        string retrievedContext = contextBuilder.ToString();

        if (string.IsNullOrEmpty(retrievedContext))
        {
            // Fallback nếu chưa nạp dữ liệu
            retrievedContext = "Chưa có thông tin công ty trong bộ nhớ. Hãy dùng kiến thức chung.";
        }

        // --- BƯỚC 2: TẠO NỘI DUNG VỚI GEMINI (GENERATION) ---

        // Cấu hình Gemini
        var geminiSettings = new GeminiPromptExecutionSettings
        {
            Temperature = 0.7, // Độ sáng tạo vừa phải
            MaxTokens = 2000
        };

        // Lấy Chat Service từ Kernel
        var chatService = _kernel.GetRequiredService<IChatCompletionService>();

        // Tạo Prompt
        string prompt = $@"
        Bạn là chuyên gia nhân sự (HR Manager). Nhiệm vụ của bạn là viết một bản Mô Tả Công Việc (JD) chuyên nghiệp, hấp dẫn ứng viên.

        --- THÔNG TIN NỘI BỘ CÔNG TY (RAG Context) ---
        (Lưu ý: BẮT BUỘC dùng thông tin dưới đây để điền vào phần 'Giới thiệu', 'Quyền lợi' và 'Môi trường làm việc'. Không được bịa đặt thông tin trái ngược)
        {retrievedContext}
        ----------------------------------------------

        --- THÔNG TIN VỊ TRÍ ỨNG TUYỂN ---
        - Vị trí: {jobTitle}
        - Yêu cầu chuyên môn/Kỹ năng cụ thể: {specificRequirements}

        --- CẤU TRÚC BẢN JD MONG MUỐN ---
        1. Tiêu đề công việc
        2. Giới thiệu về công ty & Môi trường làm việc (Dùng RAG Context)
        3. Mô tả công việc (Trách nhiệm chính)
        4. Yêu cầu ứng viên (Dựa trên yêu cầu chuyên môn + Kỹ năng mềm cần thiết)
        5. Quyền lợi & Chế độ đãi ngộ (Dùng RAG Context - Liệt kê chi tiết để hấp dẫn ứng viên)
        6. Thông tin liên hệ (Để trống để điền sau)

        Hãy viết bằng giọng văn chuyên nghiệp, thu hút.";

        // Gọi AI
        var result = await chatService.GetChatMessageContentAsync(
            prompt,
            geminiSettings,
            _kernel
        );

        return result.Content;
    }
}
