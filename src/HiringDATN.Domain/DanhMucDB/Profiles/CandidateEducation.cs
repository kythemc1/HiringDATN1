using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class CandidateEducation : FullAuditedEntity<long>
{
    public virtual long ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public virtual CandidateProfile ProfileFk { get; set; }

    [StringLength(200)]
    public virtual string? SchoolName { get; set; } // Có thể link tới bảng Master Data University nếu muốn

    [StringLength(200)]
    public virtual string? Degree { get; set; } // Bằng cấp: Cử nhân, Thạc sĩ...

    [StringLength(200)]
    public virtual string? Major { get; set; } // Chuyên ngành: KHMT, CNTT...

    public virtual DateTime StartDate { get; set; }
    public virtual DateTime? EndDate { get; set; }

    public virtual double? GPA { get; set; } // Điểm số
    public virtual string? Description { get; set; } // Thành tích nổi bật khi đi học
}