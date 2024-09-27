using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infraestructure.config
{
    public class BloodTestConfig : IEntityTypeConfiguration<BloodTest>
    {
        public void Configure(EntityTypeBuilder<BloodTest> builder)
        {
            builder.Property(bt => bt.Date)
            .IsRequired();

            builder.Property(bt => bt.Hemoglobin)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Hematocrit)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.WhiteBloodCell)
            .HasColumnType("int")
            .IsRequired(false);
            builder.Property(bt => bt.Platelets)
            .HasColumnType("int")
            .IsRequired(false);
            builder.Property(bt => bt.Glucose)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.CholesterolHDL)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.CholesterolLDL)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Triglycerides)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.RedBloodCell)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.MeanCorpuscularVolume)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.MeanCorpuscularHemoglobin)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.MeanCorpuscularHemoglobinConcentration)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.RedCellDistributionWidth)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.BloodUreaNitrogen)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Creatinine)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Sodium)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Potassium)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Chloride)
            .HasColumnType( "decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Bicarbonate)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Calcium)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Magnesium)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Neutrophils)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Lymphocytes)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Monocytes)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Eosinophils)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
            builder.Property(bt => bt.Basophils)
            .HasColumnType("decimal(5,2)")
            .IsRequired(false);
        }
    }
}