using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Auditing;
using Volo.Abp.Domain.Entities.Auditing;


namespace HiringDATN;

// Bảng cấu hình các Model AI (OpenAI, Gemini, Local...)
[Audited]
public class AiModelConfig : FullAuditedAggregateRoot<long>
{
    [Required]
    [StringLength(100)]
    public virtual string? ProviderName { get; set; } // VD: OpenAI, Gemini, Ollama

    [Required]
    [StringLength(100)]
    public virtual string? ModelName { get; set; } // VD: gpt-4o, gemini-1.5-flash

    public virtual string? ApiKey { get; set; } // Nên mã hóa khi lưu

    public virtual string? BaseUrl { get; set; } // Dùng cho Local LLM

    public virtual bool IsActive { get; set; }
}