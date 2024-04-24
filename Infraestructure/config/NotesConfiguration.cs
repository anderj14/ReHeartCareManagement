using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class NotesConfiguration : IEntityTypeConfiguration<Notes>
    {
        public void Configure(EntityTypeBuilder<Notes> builder)
        {
            // builder.HasOne(n => n.AppUser).WithMany(u => u.Notes).HasForeignKey(n => n.UserId)
            //     .OnDelete(DeleteBehavior.Restrict);
        }
    }
}