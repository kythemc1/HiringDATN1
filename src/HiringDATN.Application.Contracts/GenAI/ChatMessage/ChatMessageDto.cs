using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class ChatMessageDto : AuditedEntityDto<long?>
{
    public long SessionId { get; set; }
    public string? Role { get; set; }
    public string? Content { get; set; }
}

public class CreateUpdateChatMessageDto : AuditedEntityDto<long?>
{
    public long SessionId { get; set; }
    public string? Role { get; set; }
    public string? Content { get; set; }
}