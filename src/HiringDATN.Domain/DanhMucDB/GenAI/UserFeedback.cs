using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class UserFeedback : FullAuditedAggregateRoot<long>
{
    public virtual long MessageId { get; set; }

    [ForeignKey(nameof(MessageId))]
    public virtual ChatMessage MessageFk { get; set; }

    public virtual int Rating { get; set; } // 1-5 sao
    public virtual string? Comment { get; set; }
    public virtual bool IsHelpful { get; set; }
}