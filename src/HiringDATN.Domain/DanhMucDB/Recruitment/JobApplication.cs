using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HiringDATN.Recruitment;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN.Recruitment;
public class JobApplication : FullAuditedAggregateRoot<long>
{
    public virtual long JobId { get; set; }
    [ForeignKey(nameof(JobId))]
    public virtual JobPosting JobPostingFk { get; set; }

    public virtual long CandidateProfileId { get; set; }
    [ForeignKey(nameof(CandidateProfileId))]
    public virtual CandidateProfile CandidateProfileFk { get; set; }

    public virtual string? ProfileSnapshotJson { get; set; }

    // Thư xin việc (AI viết dựa trên ProfileSnapshotJson và JobDescription)
    public virtual string? CoverLetter { get; set; }

    public virtual ApplicationStatus Status { get; set; }
    public virtual double? AiMatchingScore { get; set; }
}
public enum ApplicationStatus { Applied, Screened, Interview, Rejected, Offer }