using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.MasterData;

public class AgentThinkingLogConfigurations : IEntityTypeConfiguration<AgentThinkingLog>
{
    public void Configure(EntityTypeBuilder<AgentThinkingLog> builder)
    {
        builder.ToTable("AgentThinkingLogs", "public");
        builder.ConfigureByConvention();
    }
}
