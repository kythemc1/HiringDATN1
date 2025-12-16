using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CreateUpdateAiModelConfigDto : AuditedEntityDto<long?>
{
    public string? ProviderName { get; set; } // VD: OpenAI, Gemini, Ollama

    public string? ModelName { get; set; } // VD: gpt-4o, gemini-1.5-flash

    public string? ApiKey { get; set; }

    public string? BaseUrl { get; set; }

    public bool? IsActive { get; set; }
}
