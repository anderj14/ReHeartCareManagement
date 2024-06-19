namespace Core.Entities
{
    public class BloodTest : BaseEntity
    {
        public DateTime Date { get; set; } // Date of the blood test
        public string Hemoglobin { get; set; } // Hemoglobin level
        public string Hematocrit { get; set; } // Hematocrit level
        public string WhiteBloodCell { get; set; } // White blood cell count
        public string Platelets { get; set; } // Platelet count
        public string Glucose { get; set; } // Glucose level
        public string CholesterolHDL { get; set; } // HDL cholesterol level
        public string CholesterolLDL { get; set; } // LDL cholesterol level
        public string Triglycerides { get; set; } // Triglycerides level
        public string RedBloodCell { get; set; } // Red blood cell count
        public string MeanCorpuscularVolume { get; set; } // Mean corpuscular volume (MCV)
        public string MeanCorpuscularHemoglobin { get; set; } // Mean corpuscular hemoglobin (MCH)
        public string MeanCorpuscularHemoglobinConcentration { get; set; } // Mean corpuscular hemoglobin concentration (MCHC)
        public string RedCellDistributionWidth { get; set; } // Red cell distribution width (RDW)
        public string BloodUreaNitrogen { get; set; } // Blood urea nitrogen (BUN)
        public string Creatinine { get; set; } // Creatinine level
        public string Sodium { get; set; } // Sodium level
        public string Potassium { get; set; } // Potassium level
        public string Chloride { get; set; } // Chloride level
        public string Bicarbonate { get; set; } // Bicarbonate level
        public string Calcium { get; set; } // Calcium level
        public string Magnesium { get; set; } // Magnesium level
        public string Neutrophils { get; set; } // Neutrophils percentage or count
        public string Lymphocytes { get; set; } // Lymphocytes percentage or count
        public string Monocytes { get; set; } // Monocytes percentage or count
        public string Eosinophils { get; set; } // Eosinophils percentage or count
        public string Basophils { get; set; } // Basophils percentage or count

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Photo> BloodTestPhotos { get; set; } = new List<Photo>();
    }
}