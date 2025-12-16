using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class CandidateProject : FullAuditedEntity<long>
{
    public virtual long ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public virtual CandidateProfile ProfileFk { get; set; }

    [Required]
    [StringLength(200)]
    public virtual string? Name { get; set; }

    [StringLength(500)]
    public virtual string? LinkUrl { get; set; } // Link demo/git

    [StringLength(2000)]
    public virtual string? Description { get; set; } // Mô tả dự án

    [StringLength(500)]
    public virtual string? Technologies { get; set; } // VD: Angular, ABP, SQL Server (Lưu dạng text hoặc JSON)

    public virtual int TeamSize { get; set; }
    public virtual string? Role { get; set; } // Vai trò: Leader, Member
}
