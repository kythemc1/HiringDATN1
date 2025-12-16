using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.MasterData;
public class ChatMessageConfigurations : IEntityTypeConfiguration<ChatMessage>
{
    public void Configure(EntityTypeBuilder<ChatMessage> builder)
    {
        builder.ToTable("ChatMessages", "public");
        builder.ConfigureByConvention();

        // Xóa Message -> Xóa Thinking Logs (Log suy luận)
        builder.HasMany(x => x.ThinkingLogs)
         .WithOne(x => x.MessageFk)
         .HasForeignKey(x => x.MessageId)
         .OnDelete(DeleteBehavior.Cascade);

        // Xóa Message -> Xóa User Feedback (Đánh giá)
        builder.HasMany(x => x.Feedbacks)
         .WithOne(x => x.MessageFk)
         .HasForeignKey(x => x.MessageId)
         .OnDelete(DeleteBehavior.Cascade);
    }
}
