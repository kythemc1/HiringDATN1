using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class JobPosting : FullAuditedAggregateRoot<long>
{
    public virtual long CompanyId { get; set; }

    [ForeignKey(nameof(CompanyId))]
    public virtual Company CompanyFk { get; set; }

    [Required]
    [StringLength(255)]
    public virtual string? Title { get; set; }

    public virtual string? JobDescription { get; set; }
    public virtual string? JobRequirements { get; set; }
    public virtual string? Benefits { get; set; }

    public virtual string? SalaryRange { get; set; }
    public virtual string? Location { get; set; }

    public virtual JobStatus Status { get; set; } // Enum: Draft, Published, Closed

    public virtual bool IsAiGenerated { get; set; } // Cờ đánh dấu tin do AI viết
}
public enum JobStatus { Draft, Published, Closed }