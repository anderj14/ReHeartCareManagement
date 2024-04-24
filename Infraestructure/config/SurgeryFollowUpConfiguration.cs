using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class SurgeryFollowUpConfiguration : IEntityTypeConfiguration<SurgeryFollowUp>
    {
        public void Configure(EntityTypeBuilder<SurgeryFollowUp> builder)
        {
            builder.HasOne(s => s.CardiologySurgery).WithMany()
                .HasForeignKey(s => s.CardiologySurgeryId);
        }
    }
}