using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;

public class CandidateExperienceDto : AuditedEntityDto<long?>
{
    public long? ProfileId { get; set; }
    public string? CompanyName { get; set; }
    public string? Position { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string? Description { get; set; }
}

public class CreateUpdateCandidateExperienceDto : EntityDto<long?>
{
    public long? ProfileId { get; set; }
    public string? CompanyName { get; set; }
    public string? Position { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string? Description { get; set; }
}