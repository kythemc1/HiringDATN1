using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;


namespace HiringDATN.Dtos;

// Bảng cấu hình các Model AI (OpenAI, Gemini, Local...)
public class AiModelConfigDto : AuditedEntityDto<long?>
{
    public string? ProviderName { get; set; } // VD: OpenAI, Gemini, Ollama

    public string? ModelName { get; set; } // VD: gpt-4o, gemini-1.5-flash

    public string? ApiKey { get; set; }

    public string? BaseUrl { get; set; }

    public bool? IsActive { get; set; }
}