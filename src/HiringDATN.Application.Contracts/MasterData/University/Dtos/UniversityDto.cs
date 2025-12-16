using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class UniversityDto : AuditedEntityDto<long?>
{
    public string? Name { get; set; }
    public string? Code { get; set; } // Mã trường
    public string? Country { get; set; }
}