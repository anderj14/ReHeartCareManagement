using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class SurgeryFollowUpConfiguration : IEntityTypeConfiguration<SurgeryFollowUp>
    {
        public void Configure(EntityTypeBuilder<SurgeryFollowUp> builder)
        {
            builder.HasOne(sf => sf.CardiologySurgery).WithMany()
                .HasForeignKey(sf => sf.CardiologySurgeryId);

            builder.HasMany(sf => sf.MedicationsPrescribed).WithOne(mp => mp.SurgeryFollowUp)
            .HasForeignKey(mp => mp.SurgeryFollowUpId);
        }
    }
}