using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CreateUpdateSkillDefinitionDto : AuditedEntityDto<long?>
{
    public string? Name { get; set; }
    public string? Category { get; set; }
    public string? Description { get; set; }
}