using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CandidateEducationDto : AuditedEntityDto<long?>
{
    public long? ProfileId { get; set; }
    public string? SchoolName { get; set; }
    public string? Degree { get; set; }
    public string? Major { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public double? GPA { get; set; }
    public string? Description { get; set; }
}

public class CreateUpdateCandidateEducationDto : EntityDto<long?>
{
    public long? ProfileId { get; set; }
    public string? SchoolName { get; set; }
    public string? Degree { get; set; }
    public string? Major { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public double? GPA { get; set; }
    public string? Description { get; set; }
}