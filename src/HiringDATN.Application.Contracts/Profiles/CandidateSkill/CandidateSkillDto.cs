using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class CandidateSkillDto : AuditedEntityDto<long?>
{
    public long? ProfileId { get; set; }
    public long SkillDefinitionId { get; set; }
    public SkillLevel Level { get; set; }
}

public class CreateUpdateCandidateSkillDto : EntityDto<long?>
{
    public long? ProfileId { get; set; }
    public long SkillDefinitionId { get; set; }
    public SkillLevel Level { get; set; }
}

public enum SkillLevel
{
    Beginner = 1,
    Intermediate = 2,
    Advanced = 3,
    Expert = 4,
    Master = 5
}