using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CreateUpdateJobPositionDto : AuditedEntityDto<long?>
{
    public string? Name { get; set; }
    public string? Alias { get; set; }
}