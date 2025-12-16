using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class CandidateSkill : FullAuditedEntity<long>
{
    public virtual long ProfileId { get; set; }
    [ForeignKey(nameof(ProfileId))]
    public virtual CandidateProfile ProfileFk { get; set; }

    public virtual long SkillDefinitionId { get; set; }
    [ForeignKey(nameof(SkillDefinitionId))]
    public virtual SkillDefinition SkillDefinitionFk { get; set; }

    public virtual SkillLevel Level { get; set; } // Enum: Beginner, Intermediate, Advanced, Expert
}

public enum SkillLevel
{
    Beginner = 1,
    Intermediate = 2,
    Advanced = 3,
    Expert = 4,
    Master = 5
}