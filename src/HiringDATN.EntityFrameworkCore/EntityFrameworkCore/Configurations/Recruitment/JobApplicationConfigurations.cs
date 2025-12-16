using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using HiringDATN.Recruitment;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.Recruitment;
public class JobApplicationConfigurations : IEntityTypeConfiguration<JobApplication>
{
    public void Configure(EntityTypeBuilder<JobApplication> builder)
    {
        builder.ToTable("JobApplications", "public");
        builder.ConfigureByConvention();

        builder.HasOne(x => x.JobPostingFk)
         .WithMany() // Giả sử bên JobPosting không có list Applications, nếu có thì điền vào
         .HasForeignKey(x => x.JobId)
         .OnDelete(DeleteBehavior.Cascade);

        // 2. Nếu Candidate Profile bị xóa -> Xóa đơn ứng tuyển (Cascade)
        builder.HasOne(x => x.CandidateProfileFk)
         .WithMany()
         .HasForeignKey(x => x.CandidateProfileId)
         .OnDelete(DeleteBehavior.Cascade);
    }
}