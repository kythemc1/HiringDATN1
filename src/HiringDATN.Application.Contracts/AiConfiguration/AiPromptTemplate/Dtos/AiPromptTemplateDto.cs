using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;


namespace HiringDATN.Dtos;

// Bảng cấu hình các Model AI (OpenAI, Gemini, Local...)
public class AiPromptTemplateDto : AuditedEntityDto<long?>
{
    public string? Code { get; set; }
    public string? TemplateContent { get; set; }
    public string? Description { get; set; }
    public Guid? ModelConfigId { get; set; }
    public double? Temperature { get; set; }
}