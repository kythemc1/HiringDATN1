using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
// Các namespace cốt lõi của Semantic Kernel
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
// Namespace cho Google Gemini
using Microsoft.SemanticKernel.Connectors.Google;
// Namespace cho Web Search
using Microsoft.SemanticKernel.Plugins.Web;
// Namespace của dự án
using Volo.Abp.Application.Services;
using HiringDATN.Dtos;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;

namespace HiringDATN.Service;

public class CoverLetterAppService : ApplicationService
{
    private readonly Kernel _kernel;
    private readonly IServiceProvider _serviceProvider;
    private readonly IRepository<AiPromptTemplate, long> _aiPromptTemplateRepository;

    public CoverLetterAppService(Kernel kernel, IServiceProvider serviceProvider, IRepository<AiPromptTemplate, long> aiPromptTemplateRepository)
    {
        _kernel = kernel;
        _serviceProvider = serviceProvider;
        _aiPromptTemplateRepository = aiPromptTemplateRepository;
    }

    public async Task<string> GenerateCoverLetterAsync(CoverLetterGenerationInputDto input)
    {

        try
        {
            // --- 1. Cấu hình WebSearch Plugin ---
            // Lưu ý: Đảm bảo bạn đã đăng ký WebSearchEnginePlugin trong file Module/Startup 
            // hoặc khởi tạo thủ công ở đây nếu chưa có DI.

            if (!_kernel.Plugins.Contains("WebSearch"))
            {
                var searchPlugin = _serviceProvider.GetRequiredService<WebSearchEnginePlugin>();
                _kernel.Plugins.AddFromObject(searchPlugin, "WebSearch");
            }

            // --- 2. Xử lý logic Tone và Ngôn ngữ ---
            string toneDescription = input.Tone switch
            {
                CoverLetterTone.Professional => "Trang trọng, lịch sự, dùng kính ngữ chuẩn mực.",
                CoverLetterTone.Startup => "Năng động, nhiệt huyết, thể hiện tinh thần 'Can-do'.",
                CoverLetterTone.Creative => "Sáng tạo, kể chuyện (storytelling), ngôn ngữ cuốn hút.",
                CoverLetterTone.Confident => "Mạnh mẽ, đi thẳng vào vấn đề, nhấn mạnh thành tích.",
                _ => "Chuyên nghiệp"
            };

            string languageInstruction = input.Language == "en-US" ? "Tiếng Anh (English)" : "Tiếng Việt";

            // --- 3. Cấu hình Gemini Settings (Đã sửa lỗi class) ---
            var settings = new GeminiPromptExecutionSettings()
            {
                Temperature = 0.8,
                // Sửa: Dùng GeminiToolCallBehavior thay vì ToolCallBehavior chung
                ToolCallBehavior = GeminiToolCallBehavior.AutoInvokeKernelFunctions,

                // QUAN TRỌNG: Thêm Safety Settings để tránh bị chặn khi viết văn bản tự do
                SafetySettings = new List<GeminiSafetySetting>
            {
                new GeminiSafetySetting(GeminiSafetyCategory.Harassment, GeminiSafetyThreshold.BlockNone),
                //new GeminiSafetySetting(GeminiSafetyCategory., GeminiSafetyThreshold.BlockNone),
                new GeminiSafetySetting(GeminiSafetyCategory.SexuallyExplicit, GeminiSafetyThreshold.BlockNone),
                new GeminiSafetySetting(GeminiSafetyCategory.DangerousContent, GeminiSafetyThreshold.BlockNone),
            }
            };

            // --- 4. Tạo Agent ---
            ChatCompletionAgent letterWriter = new()
            {
                Name = "LetterWriter",
                Instructions =
                    $"Bạn là chuyên gia nhân sự cao cấp. Hãy viết Cover Letter bằng {languageInstruction}.\n" +
                    "QUY TẮC:\n" +
                    "1. HEADER: Phải trình bày đầy đủ Tên, Email, SĐT của ứng viên ở đầu thư.\n" +
                    "2. NGHIÊN CỨU: Dùng tool `WebSearch` tìm thông tin về công ty mục tiêu để khen ngợi khéo léo ở đoạn mở đầu.\n" +
                    "3. SO KHỚP (MATCHING): Chọn lọc 2-3 kinh nghiệm từ CV khớp nhất với Job Description để chứng minh năng lực.\n" +
                    $"4. GIỌNG VĂN: {toneDescription}",
                Kernel = _kernel,
                Arguments = new KernelArguments(settings)
            };

            // --- 5. Tạo Prompt ---

            var template = await GetByCodeAsync("CoverLetterTemplate");

            var userPrompt = ApplyGenerateCoverLetterTemplate(template.TemplateContent!, input);

            //string userPrompt = $@"
            //    --- THÔNG TIN ỨNG VIÊN ---
            //    Tên: {input.CandidateName}
            //    Email: {input.CandidateEmail}
            //    SĐT: {input.CandidatePhone}
                
            //    --- HỒ SƠ NĂNG LỰC (CV) ---
            //    {input.CvContent}

            //    --- THÔNG TIN ỨNG TUYỂN ---
            //    Công ty: {input.TargetCompanyName}
            //    Vị trí: {input.TargetJobTitle}
                
            //    --- YÊU CẦU CÔNG VIỆC (JD) ---
            //    {input.JobDescription}

            //    Hãy viết một lá thư hoàn chỉnh.";

            // --- 6. Thực thi ---
            AgentGroupChat chat = new(letterWriter);
            chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, userPrompt));

            string result = "";

            // Dùng await foreach để lấy kết quả stream (hoặc lấy chunk cuối cùng)
            try
            {
                await foreach (var content in chat.InvokeAsync())
                {
                    if (content.AuthorName == "LetterWriter")
                    {
                        result += content.Content;
                    }
                }
            }
            catch (HttpOperationException httpEx)
            {
                // Lỗi này của Semantic Kernel sẽ chứa Response Body
                var responseBody = httpEx.ResponseContent;

                // Đặt Breakpoint ở đây hoặc Log ra file để xem
                // Google thường trả về JSON ghi rõ: "Daily Limit Exceeded" hoặc "Project not enabled"
                Console.WriteLine($"LỖI API GOOGLE: {responseBody}");
                throw; // Ném lỗi tiếp
            }
            catch (Exception ex)
            {
                Console.WriteLine($"LỖI KHÁC: {ex.Message}");
                throw;
            }
            return result;
        }
        catch (Exception ex)
        {
            // Đặt Breakpoint tại dòng Console.WriteLine này!
            // Xem kỹ biến 'ex' trong cửa sổ Locals/Watch
            Console.WriteLine($"--- LỖI BẮT ĐƯỢC: {ex.Message}");
            Console.WriteLine($"--- STACK TRACE: {ex.StackTrace}");

            if (ex.InnerException != null)
            {
                Console.WriteLine($"--- LỖI GỐC (Inner): {ex.InnerException.Message}");
            }

            throw; // Ném tiếp lỗi để hiện ra 500 (nhưng giờ ta đã xem được log)
        }
    }

    private string ApplyGenerateCoverLetterTemplate(
    string template,
    CoverLetterGenerationInputDto input)
    {
        if (string.IsNullOrWhiteSpace(template))
        {
            return string.Empty;
        }

        return template
            .Replace("{{CandidateName}}", input.CandidateName ?? string.Empty)
            .Replace("{{CandidateEmail}}", input.CandidateEmail ?? string.Empty)
            .Replace("{{CandidatePhone}}", input.CandidatePhone ?? string.Empty)
            .Replace("{{CvContent}}", input.CvContent ?? string.Empty)
            .Replace("{{TargetCompanyName}}", input.TargetCompanyName ?? string.Empty)
            .Replace("{{TargetJobTitle}}", input.TargetJobTitle ?? string.Empty)
            .Replace("{{JobDescription}}", input.JobDescription ?? string.Empty)
            .Replace("{{Language}}", input.Language ?? "vi-VN")
            .Replace("{{Tone}}", input.Tone.ToString());
    }



    public async Task<AiPromptTemplate> GetByCodeAsync(string code)
    {
        var template = await _aiPromptTemplateRepository.FirstOrDefaultAsync(x => x.Code == code);
        if (template == null)
        {
            throw new BusinessException("AI_PROMPT_TEMPLATE_NOT_FOUND")
                .WithData("Code", code);
        }

        return template;
    }
}