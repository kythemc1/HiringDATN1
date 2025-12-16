using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CandidateProjectDto : AuditedEntityDto<long?>
{
    public long ProfileId { get; set; }
    public string? Name { get; set; }
    public string? LinkUrl { get; set; }
    public string? Description { get; set; }
    public string? Technologies { get; set; }
    public int TeamSize { get; set; }
    public string? Role { get; set; }
}

public class CreateUpdateCandidateProjectDto : AuditedEntityDto<long?>
{
    public long ProfileId { get; set; }
    public string? Name { get; set; }
    public string? LinkUrl { get; set; }
    public string? Description { get; set; }
    public string? Technologies { get; set; }
    public int TeamSize { get; set; }
    public string? Role { get; set; }
}