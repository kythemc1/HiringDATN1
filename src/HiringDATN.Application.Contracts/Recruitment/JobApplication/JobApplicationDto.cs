using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class JobApplicationDto : AuditedEntityDto<long?>
{
    public long JobId { get; set; }
    public long CandidateProfileId { get; set; }
    public string? ProfileSnapshotJson { get; set; }
    public string? CoverLetter { get; set; }
    public ApplicationStatus Status { get; set; }
    public double? AiMatchingScore { get; set; }
}

public class CreateUpdateJobApplicationDto : AuditedEntityDto<long?>
{
    public long JobId { get; set; }
    public long CandidateProfileId { get; set; }
    public string? ProfileSnapshotJson { get; set; }
    public string? CoverLetter { get; set; }
    public ApplicationStatus Status { get; set; }
    public double? AiMatchingScore { get; set; }
}

public enum ApplicationStatus { Applied, Screened, Interview, Rejected, Offer }