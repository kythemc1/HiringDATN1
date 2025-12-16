using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class AiPromptTemplate : FullAuditedAggregateRoot<long>
{
    [Required]
    [StringLength(50)]
    public virtual string? Code { get; set; } // VD: GEN_CV_REVIEW, AGENT_SEARCH_JOB

    public virtual string? TemplateContent { get; set; } // Chứa placeholder {{Skill}}, {{Name}}

    public virtual string? Description { get; set; }

    public virtual long? ModelConfigId { get; set; }

    [ForeignKey(nameof(ModelConfigId))]
    public virtual AiModelConfig AiModelConfigFk { get; set; }

    public virtual double Temperature { get; set; } = 0.7; // Độ sáng tạo
}