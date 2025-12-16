using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class JobPostingDto : AuditedEntityDto<long?>
{
    public long CompanyId { get; set; }
    public string? Title { get; set; }
    public string? JobDescription { get; set; }
    public string? JobRequirements { get; set; }
    public string? Benefits { get; set; }
    public string? SalaryRange { get; set; }
    public string? Location { get; set; }
    public JobStatus Status { get; set; }
    public bool IsAiGenerated { get; set; }
}

public class CreateUpdateJobPostingDto : AuditedEntityDto<long?>
{
    public long CompanyId { get; set; }
    public string? Title { get; set; }
    public string? JobDescription { get; set; }
    public string? JobRequirements { get; set; }
    public string? Benefits { get; set; }
    public string? SalaryRange { get; set; }
    public string? Location { get; set; }
    public JobStatus Status { get; set; }
    public bool IsAiGenerated { get; set; }
}

public enum JobStatus { Draft, Published, Closed }