using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class CandidateCertificate : FullAuditedEntity<long>
{
    public virtual long ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public virtual CandidateProfile ProfileFk { get; set; }

    [Required]
    [StringLength(200)]
    public virtual string? Name { get; set; } // VD: AWS Solution Architect

    [StringLength(200)]
    public virtual string? Issuer { get; set; } // VD: Amazon

    public virtual DateTime IssueDate { get; set; }
    public virtual DateTime? ExpiryDate { get; set; }

    public virtual string? CredentialUrl { get; set; } // Link xác thực
}