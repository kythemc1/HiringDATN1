using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace HiringDATN.EntityFrameworkCore.Configurations.MasterData;
public class ChatSessionConfigurations : IEntityTypeConfiguration<ChatSession>
{
    public void Configure(EntityTypeBuilder<ChatSession> builder)
    {
        builder.ToTable("ChatSessions", "public");
        builder.ConfigureByConvention();

        //// Xóa Session -> Xóa hết Messages
        //builder.HasMany(x => x.
        // .WithOne(x => x.SessionFk)
        // .HasForeignKey(x => x.SessionId)
        // .OnDelete(DeleteBehavior.Cascade);
    }
}
