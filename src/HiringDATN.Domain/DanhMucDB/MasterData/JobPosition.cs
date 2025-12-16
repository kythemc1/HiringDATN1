using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class SkillDefinition : FullAuditedAggregateRoot<long>
{
    [Required]
    [StringLength(200)]
    public virtual string? Name { get; set; } // C#, Angular, Communication

    [StringLength(50)]
    public virtual string? Category { get; set; } // Tech, SoftSkill, Language

    public virtual string? Description { get; set; }
}
