using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class ChatSessionDto : AuditedEntityDto<long?>
{
    public long UserId { get; set; }
    public string? Title { get; set; }
    public string? SessionType { get; set; }
}

public class CreateUpdateChatSessionDto : AuditedEntityDto<long?>
{
    public long UserId { get; set; }
    public string? Title { get; set; }
    public string? SessionType { get; set; }
}