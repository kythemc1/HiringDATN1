using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.Profiles;
public class CandidateProjectConfigurations : IEntityTypeConfiguration<CandidateProject>
{
    public void Configure(EntityTypeBuilder<CandidateProject> builder)
    {
        builder.ToTable("CandidateProjects", "public");
        builder.ConfigureByConvention();
    }
}