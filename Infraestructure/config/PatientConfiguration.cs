using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.PatientName).IsRequired().HasMaxLength(150);
            builder.Property(p => p.CarnetIdentification).IsRequired();
            builder.Property(p => p.DOB).IsRequired();
            builder.Property(p => p.Gender).IsRequired();
            builder.Property(p => p.Address);
            builder.Property(p => p.Phone).IsRequired();
            builder.Property(p => p.Email);
            builder.Property(p => p.SocialSecurity).IsRequired();

            // Relationship appointment
            builder.HasMany(p => p.Appointments).WithOne(a => a.Patient)
            .HasForeignKey(a => a.PatientId);
            // Relationship blood test
            builder.HasMany(p => p.BloodTests).WithOne(bt => bt.Patient)
            .HasForeignKey(bt => bt.PatientId);
            // Relationship cardiac catheterization study
            builder.HasMany(p => p.CardiacCatheterizationStudies).WithOne(ccs => ccs.Patient)
            .HasForeignKey(ccs => ccs.PatientId);
            // Relationship diagnostic
            builder.HasMany(p => p.Diagnostics).WithOne(d => d.Patient)
            .HasForeignKey(d => d.PatientId);
            // Relationship disease history
            builder.HasMany(p => p.DiseaseHistories).WithOne(dh => dh.Patient)
            .HasForeignKey(dh => dh.PatientId);
            // Relationship echocardiogram
            builder.HasMany(p => p.Echocardiograms).WithOne(e => e.Patient)
            .HasForeignKey(e => e.PatientId);
            // Relationship electrocardiogram
            builder.HasMany(p => p.Electrocardiograms).WithOne(e => e.Patient)
            .HasForeignKey(e => e.PatientId);
            // Relationship holter study
            builder.HasMany(p => p.HolterStudies).WithOne(hs => hs.Patient)
            .HasForeignKey(hs => hs.PatientId);
            // Relationship medical history
            builder.HasMany(p => p.MedicalHistories).WithOne(mh => mh.Patient)
            .HasForeignKey(mh => mh.PatientId);
            // Relationship physical examination
            builder.HasMany(p => p.PhysicalExaminations).WithOne(pe => pe.Patient)
            .HasForeignKey(pe => pe.PatientId);
            // Relationship stress test
            builder.HasMany(p => p.StressTests).WithOne(st => st.Patient)
            .HasForeignKey(st => st.PatientId);
            // Relationship treatment
            builder.HasMany(p => p.Treatments).WithOne(t => t.Patient)
            .HasForeignKey(t => t.PatientId);
            // Relationship cardiology surgery
            builder.HasMany(p => p.CardiologySurgery).WithOne(t => t.Patient)
            .HasForeignKey(cs => cs.PatientId);
        }
    }
}