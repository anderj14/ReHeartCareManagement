using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class DiseaseHistoryConfiguration : IEntityTypeConfiguration<DiseaseHistory>
    {
        public void Configure(EntityTypeBuilder<DiseaseHistory> builder)
        {
            builder.HasMany(dh => dh.Attachments).WithOne(a => a.DiseaseHistory)
            .HasForeignKey(a => a.DiseaseHistoryId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}