using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.AiConfiguration;

public class AiPromptTemplateConfigurations : IEntityTypeConfiguration<AiPromptTemplate>
{
    public void Configure(EntityTypeBuilder<AiPromptTemplate> builder)
    {
        builder.ToTable("AiPromptTemplates", "public");
        builder.ConfigureByConvention();

        builder.HasOne(x => x.AiModelConfigFk)
         .WithMany()
         .HasForeignKey(x => x.ModelConfigId) ;
    }
}
