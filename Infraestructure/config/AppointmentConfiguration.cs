using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasOne(a => a.AppointmentStatus).WithMany()
                .HasForeignKey(i => i.AppointmentStatusId);
            
            builder
            .HasOne(u => u.AppUser)
            .WithMany(u => u.Appointments)
            .HasForeignKey(a => a.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}