
using Core.Entities.HolterStudyInfo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class HolterStudyConfiguration : IEntityTypeConfiguration<HolterStudy>
    {
        public void Configure(EntityTypeBuilder<HolterStudy> builder)
        {
            builder.HasMany(hs => hs.ArrhythmiaEvents).WithOne(ae => ae.HolterStudy)
            .HasForeignKey(ae => ae.HolterStudyId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(hs => hs.MedicationAdministrations).WithOne(ma => ma.HolterStudy)
            .HasForeignKey(ma => ma.HolterStudyId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(hs => hs.PatientSymptoms).WithOne(ma => ma.HolterStudy)
            .HasForeignKey(ma => ma.HolterStudyId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(hs => hs.ClinicalEvaluations).WithOne(ma => ma.HolterStudy)
            .HasForeignKey(ma => ma.HolterStudyId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(hs => hs.AdditionalTestResults).WithOne(ma => ma.HolterStudy)
            .HasForeignKey(ma => ma.HolterStudyId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}