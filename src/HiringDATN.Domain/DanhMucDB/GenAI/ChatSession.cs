using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class ChatSession : FullAuditedAggregateRoot<long>
{
    public virtual long UserId { get; set; } // Người chat

    [StringLength(200)]
    public virtual string? Title { get; set; } // Tiêu đề đoạn chat

    public virtual string? SessionType { get; set; } // CV_Review, Mock_Interview...
}