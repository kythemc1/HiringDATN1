using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class AgentThinkingLog : FullAuditedAggregateRoot<long>
{
    public virtual long MessageId { get; set; }

    [ForeignKey(nameof(MessageId))]
    public virtual ChatMessage MessageFk { get; set; }

    public virtual string? AgentName { get; set; } // Tên Agent thực hiện
    public virtual string? StepName { get; set; } // Bước xử lý (Search, ReadFile...)
    public virtual string? InputData { get; set; } // Tham số đầu vào
    public virtual string? OutputData { get; set; } // Kết quả tool trả về
    public virtual double DurationMs { get; set; } // Thời gian chạy
}