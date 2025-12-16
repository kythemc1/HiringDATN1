using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace HiringDATN.Dtos;
public class AgentThinkingLogDto : AuditedEntityDto<long?>
{
    public long MessageId { get; set; }
    public string? AgentName { get; set; }
    public string? StepName { get; set; }
    public string? InputData { get; set; }
    public string? OutputData { get; set; }
    public double DurationMs { get; set; }
}

public class CreateUpdateAgentThinkingLogDto : AuditedEntityDto<long?>
{
    public long MessageId { get; set; }
    public string? AgentName { get; set; }
    public string? StepName { get; set; }
    public string? InputData { get; set; }
    public string? OutputData { get; set; }
    public double DurationMs { get; set; }
}