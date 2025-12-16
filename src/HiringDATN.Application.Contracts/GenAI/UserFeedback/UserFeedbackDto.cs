using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class UserFeedbackDto : AuditedEntityDto<long?>
{
    public long MessageId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public bool IsHelpful { get; set; }
}

public class CreateUpdateUserFeedbackDto : AuditedEntityDto<long?>
{
    public long MessageId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public bool IsHelpful { get; set; }
}