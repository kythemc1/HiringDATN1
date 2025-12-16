using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class CandidateProfile : FullAuditedAggregateRoot<long>
{
    public virtual long UserId { get; set; } // Map với AbpUsers

    [Required]
    [StringLength(200)]
    public virtual string? FullName { get; set; }

    [StringLength(200)]
    public virtual string? JobTitle { get; set; } // VD: Senior .NET Developer

    [StringLength(500)]
    public virtual string? AboutMe { get; set; } // Giới thiệu bản thân ngắn gọn

    public virtual DateTime? DateOfBirth { get; set; }
    public virtual string? PhoneNumber { get; set; }
    public virtual string? Email { get; set; }
    public virtual string? Address { get; set; }

    [StringLength(500)]
    public virtual string? GithubUrl { get; set; } // Quan trọng cho dân IT
    [StringLength(500)]
    public virtual string? LinkedInUrl { get; set; }

    // Các quan hệ 1-N (Detail)
    public virtual ICollection<CandidateExperience>? Experiences { get; set; }
    public virtual ICollection<CandidateEducation>? Educations { get; set; }
    public virtual ICollection<CandidateProject>? Projects { get; set; }
    public virtual ICollection<CandidateCertificate>? Certificates { get; set; }
    public virtual ICollection<CandidateSkill>? Skills { get; set; }
}
