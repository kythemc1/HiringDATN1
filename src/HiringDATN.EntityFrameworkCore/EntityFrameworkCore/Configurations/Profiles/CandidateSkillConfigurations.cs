using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;


namespace HiringDATN.EntityFrameworkCore.Configurations.Profiles;
public class CandidateSkillConfigurations : IEntityTypeConfiguration<CandidateSkill>
{
    public void Configure(EntityTypeBuilder<CandidateSkill> builder)
    {
        builder.ToTable("CandidateSkills", "public");
        builder.ConfigureByConvention();

        builder.HasOne(x => x.SkillDefinitionFk)
         .WithMany()
         .HasForeignKey(x => x.SkillDefinitionId)
         .OnDelete(DeleteBehavior.Restrict);
    }
}