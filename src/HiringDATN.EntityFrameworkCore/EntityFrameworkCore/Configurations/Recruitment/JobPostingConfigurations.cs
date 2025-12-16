using HiringDATN.Recruitment;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.Recruitment;
public class JobPostingConfigurations : IEntityTypeConfiguration<JobPosting>
{
    public void Configure(EntityTypeBuilder<JobPosting> builder)
    {
        builder.ToTable("JobPostings", "public");
        builder.ConfigureByConvention();


        builder.HasOne(x => x.CompanyFk)
         .WithMany()
         .HasForeignKey(x => x.CompanyId)
         .OnDelete(DeleteBehavior.Cascade);
    }
}