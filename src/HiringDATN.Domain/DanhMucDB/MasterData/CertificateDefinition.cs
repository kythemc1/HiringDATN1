using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;

public class CertificateDefinition : FullAuditedAggregateRoot<long>
{
    public string? Name { get; set; }
}
