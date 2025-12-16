using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace HiringDATN;
public class Company : FullAuditedAggregateRoot<long>
{
    [Required]
    [StringLength(200)]
    public virtual string? Name { get; set; }

    public virtual string? Description { get; set; }
    public virtual string? Website { get; set; }
    public virtual string? LogoUrl { get; set; }
    public virtual string? Address { get; set; }
}