using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class JobPosition : FullAuditedAggregateRoot<long>
{
    [Required]
    [StringLength(200)]
    public virtual string? Name { get; set; }

    public virtual string? Alias { get; set; }
}