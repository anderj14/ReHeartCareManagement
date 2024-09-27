namespace Core.Entities
{
    public class BloodTest : BaseEntity
    {
        public DateTime Date { get; set; } // Date of the blood test

        // Using decimal? for precision in medical values
        public decimal? Hemoglobin { get; set; } // Hemoglobin level in g/dL
        public decimal? Hematocrit { get; set; } // Hematocrit level as a percentage (%)
        public int? WhiteBloodCell { get; set; } // White blood cell count in cells/µL
        public int? Platelets { get; set; } // Platelet count in cells/µL
        public decimal? Glucose { get; set; } // Glucose level in mg/dL
        public decimal? CholesterolHDL { get; set; } // HDL cholesterol level in mg/dL
        public decimal? CholesterolLDL { get; set; } // LDL cholesterol level in mg/dL
        public decimal? Triglycerides { get; set; } // Triglycerides level in mg/dL
        public decimal? RedBloodCell { get; set; } // Red blood cell count in millions/µL
        public decimal? MeanCorpuscularVolume { get; set; } // Mean corpuscular volume (MCV) in fL
        public decimal? MeanCorpuscularHemoglobin { get; set; } // Mean corpuscular hemoglobin (MCH) in pg
        public decimal? MeanCorpuscularHemoglobinConcentration { get; set; } // Mean corpuscular hemoglobin concentration (MCHC) in g/dL
        public decimal? RedCellDistributionWidth { get; set; } // Red cell distribution width (RDW) in percentage (%)
        public decimal? BloodUreaNitrogen { get; set; } // Blood urea nitrogen (BUN) in mg/dL
        public decimal? Creatinine { get; set; } // Creatinine level in mg/dL
        public decimal? Sodium { get; set; } // Sodium level in mEq/L
        public decimal? Potassium { get; set; } // Potassium level in mEq/L
        public decimal? Chloride { get; set; } // Chloride level in mEq/L
        public decimal? Bicarbonate { get; set; } // Bicarbonate level in mEq/L
        public decimal? Calcium { get; set; } // Calcium level in mg/dL
        public decimal? Magnesium { get; set; } // Magnesium level in mg/dL

        // Percentages for differential counts of white blood cells
        public decimal? Neutrophils { get; set; } // Neutrophils percentage
        public decimal? Lymphocytes { get; set; } // Lymphocytes percentage
        public decimal? Monocytes { get; set; } // Monocytes percentage
        public decimal? Eosinophils { get; set; } // Eosinophils percentage
        public decimal? Basophils { get; set; } // Basophils percentage

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Photo> BloodTestPhotos { get; set; } = new List<Photo>();
    }
}