using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.Profiles;
public class CandidateProfileConfigurations : IEntityTypeConfiguration<CandidateProfile>
{
    public void Configure(EntityTypeBuilder<CandidateProfile> builder)
    {
        builder.ToTable("CandidateProfiles", "public");
        builder.ConfigureByConvention();
        builder.HasMany(x => x.Experiences).WithOne(x => x.ProfileFk).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Educations).WithOne(x => x.ProfileFk).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Projects).WithOne(x => x.ProfileFk).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Certificates).WithOne(x => x.ProfileFk).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Skills).WithOne(x => x.ProfileFk).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
    }
}