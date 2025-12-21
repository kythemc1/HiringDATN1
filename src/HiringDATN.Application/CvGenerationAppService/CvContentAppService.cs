using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Dtos;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Google;
using Microsoft.SemanticKernel.Plugins.Web;
using Microsoft.SemanticKernel;
using Volo.Abp.Application.Services;

namespace HiringDATN.CvGenerationAppService;

public class CvContentAppService : ApplicationService
{
    private readonly Kernel _kernel;
    private readonly IServiceProvider _serviceProvider;

    public CvContentAppService(Kernel kernel, IServiceProvider serviceProvider)
    {
        _kernel = kernel;
        _serviceProvider = serviceProvider;
    }

    // --- FUNCTION 1: TỐI ƯU HÓA KINH NGHIỆM LÀM VIỆC ---
    public async Task<string> OptimizeWorkExperienceAsync(OptimizeWorkExperienceInputDto input)
    {
        // 1. Cấu hình Plugin & Settings
        ConfigureSearchPlugin();
        var settings = GetGeminiSettings();

        // 2. Tạo Agent chuyên gia viết CV
        ChatCompletionAgent cvExpert = new()
        {
            Name = "CvExpert",
            Instructions = "Bạn là chuyên gia tư vấn tuyển dụng hàng đầu. Nhiệm vụ của bạn là viết lại mô tả công việc trong CV sao cho chuyên nghiệp, sử dụng phương pháp STAR (Situation-Task-Action-Result) và tối ưu hóa cho hệ thống quét CV (ATS).",
            Kernel = _kernel,
            Arguments = new KernelArguments(settings)
        };

        // 3. Tạo Prompt thông minh (Kết hợp Search)
        string prompt = $@"
        Người dùng muốn tối ưu hóa kinh nghiệm làm việc cho vị trí: '{input.JobTitle}' tại công ty '{input.CompanyName}'.
        
        Mô tả thô của người dùng:
        ""{input.RawDescription}""

        NHIỆM VỤ CỦA BẠN:
        1. Bước 1 (SEARCH): Hãy dùng công cụ Search để tìm kiếm 'Top keywords and skills for {input.JobTitle} resume' để biết thị trường đang cần kỹ năng gì.
        2. Bước 2 (REWRITE): Viết lại mô tả thô của người dùng thành 3-5 gạch đầu dòng súc tích, mạnh mẽ.
           - Bắt đầu bằng động từ chỉ hành động (Action Verbs).
           - Lồng ghép các từ khóa (keywords) bạn vừa tìm được ở Bước 1 vào nội dung nếu phù hợp.
           - Nếu có số liệu trong mô tả thô, hãy làm nổi bật nó.
        
        Chỉ trả về kết quả là các gạch đầu dòng (Bullet points), không cần lời dẫn và là tiếng việt.";

        // 4. Thực thi
        return await ExecuteAgentAsync(cvExpert, prompt);
    }

    // --- FUNCTION 2: TẠO MỤC TIÊU NGHỀ NGHIỆP (CAREER OBJECTIVE) ---
    public async Task<string> GenerateCareerObjectiveAsync(GenerateObjectiveInputDto input)
    {
        // 1. Cấu hình Plugin & Settings
        ConfigureSearchPlugin();
        var settings = GetGeminiSettings();

        // 2. Tạo Agent chuyên gia định hướng
        ChatCompletionAgent careerCoach = new()
        {
            Name = "CareerCoach",
            Instructions = "Bạn là chuyên gia định hướng nghề nghiệp. Bạn giúp ứng viên viết phần 'Career Objective' ngắn gọn (2-3 câu), ấn tượng và thể hiện sự phù hợp văn hóa doanh nghiệp.",
            Kernel = _kernel,
            Arguments = new KernelArguments(settings)
        };

        // 3. Tạo Prompt (Kết hợp Search văn hóa công ty)
        string prompt = $@"
        Ứng viên: {input.CurrentRole} ({input.YearsOfExperience} năm kinh nghiệm).
        Đang ứng tuyển vào: {input.TargetCompanyName} cho vị trí {input.TargetJobTitle}.

        NHIỆM VỤ CỦA BẠN:
        1. Bước 1 (SEARCH): Dùng công cụ Search để tìm 'Mission, Vision, Core Values of {input.TargetCompanyName}'. Nếu không tìm thấy công ty cụ thể, hãy tìm xu hướng chung của vị trí {input.TargetJobTitle}.
        2. Bước 2 (WRITE): Viết một đoạn Mục tiêu nghề nghiệp (Career Objective) bằng Tiếng Việt.
           - Câu 1: Nêu rõ kinh nghiệm/thế mạnh hiện tại.
           - Câu 2: Thể hiện mong muốn đóng góp cho công ty, lồng ghép khéo léo Sứ mệnh/Giá trị cốt lõi bạn tìm được ở Bước 1.
           - Giọng văn: Cầu tiến, chuyên nghiệp và cam kết gắn bó.

        Hãy trả về kết quả đoạn văn hoàn chỉnh bằng tiếng việt.";

        // 4. Thực thi
        return await ExecuteAgentAsync(careerCoach, prompt);
    }

    // --- HELPERS (Tái sử dụng code) ---

    private void ConfigureSearchPlugin()
    {
        // Kiểm tra tránh lỗi Duplicate Plugin
        if (!_kernel.Plugins.Contains("WebSearch"))
        {
            var searchPlugin = _serviceProvider.GetRequiredService<WebSearchEnginePlugin>();
            _kernel.Plugins.AddFromObject(searchPlugin, "WebSearch");
        }
    }

    private GeminiPromptExecutionSettings GetGeminiSettings()
    {
        return new GeminiPromptExecutionSettings()
        {
            Temperature = 0.7, // Sáng tạo vừa phải
            ToolCallBehavior = GeminiToolCallBehavior.AutoInvokeKernelFunctions, // Cho phép tự gọi Google Search
            SafetySettings = new List<GeminiSafetySetting>
            {
                new GeminiSafetySetting(GeminiSafetyCategory.Harassment, GeminiSafetyThreshold.BlockNone),
                //new GeminiSafetySetting(GeminiSafetyCategory.HateSpeech, GeminiSafetyThreshold.BlockNone),
                new GeminiSafetySetting(GeminiSafetyCategory.SexuallyExplicit, GeminiSafetyThreshold.BlockNone),
                new GeminiSafetySetting(GeminiSafetyCategory.DangerousContent, GeminiSafetyThreshold.BlockNone),
            }
        };
    }

    private async Task<string> ExecuteAgentAsync(ChatCompletionAgent agent, string userPrompt)
    {
        AgentGroupChat chat = new(agent);
        chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, userPrompt));

        string result = "";
        try
        {
            await foreach (var content in chat.InvokeAsync())
            {
                if (content.AuthorName == agent.Name)
                {
                    result += content.Content;
                }
            }
        }
        catch (Exception ex)
        {
            // Log lỗi (có thể tích hợp Serilog ở đây)
            throw new Exception($"Lỗi khi gọi AI: {ex.Message}");
        }

        return result;
    }
}