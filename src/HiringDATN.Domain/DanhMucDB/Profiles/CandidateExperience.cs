using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class CandidateExperience : FullAuditedAggregateRoot<long>
{
    public virtual long ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public virtual CandidateProfile ProfileFk { get; set; }

    [Required]
    [StringLength(200)]
    public virtual string? CompanyName { get; set; }

    [StringLength(200)]
    public virtual string? Position { get; set; } // Chức vụ

    public virtual DateTime StartDate { get; set; }
    public virtual DateTime? EndDate { get; set; }
    public virtual bool IsCurrent { get; set; }

    // Mô tả chi tiết những gì đã làm. AI sẽ dựa vào đây để matching.
    [StringLength(2000)]
    public virtual string? Description { get; set; }
}
