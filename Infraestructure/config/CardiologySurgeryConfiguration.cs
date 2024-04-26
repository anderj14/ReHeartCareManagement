using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class CardiologySurgeryConfiguration : IEntityTypeConfiguration<CardiologySurgery>
    {
        public void Configure(EntityTypeBuilder<CardiologySurgery> builder)
        {

            builder
            .HasOne(u => u.AppUser)
            .WithMany(u => u.CardiologySurgeries)
            .HasForeignKey(cs => cs.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}