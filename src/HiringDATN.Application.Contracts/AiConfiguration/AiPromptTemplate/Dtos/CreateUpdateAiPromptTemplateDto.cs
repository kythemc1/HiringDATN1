using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CreateUpdateAiPromptTemplateDto : AuditedEntityDto<long?>
{
    public string? Code { get; set; }
    public string? TemplateContent { get; set; }
    public string? Description { get; set; }
    public Guid? ModelConfigId { get; set; }
    public double? Temperature { get; set; }
}
