using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class ChatMessage : FullAuditedAggregateRoot<long>
{
    public virtual long SessionId { get; set; }

    [ForeignKey(nameof(SessionId))]
    public virtual ChatSession SessionFk { get; set; }

    [StringLength(50)]
    public virtual string? Role { get; set; } // User, Assistant, System

    public virtual string? Content { get; set; }

    public virtual ICollection<AgentThinkingLog>? ThinkingLogs { get; set; }
    public virtual ICollection<UserFeedback>? Feedbacks { get; set; }
}