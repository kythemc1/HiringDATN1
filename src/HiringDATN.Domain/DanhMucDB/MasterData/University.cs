using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

// Danh sách trường đại học.
public class University : FullAuditedAggregateRoot<long>
{
    public string? Name { get; set; }
}
