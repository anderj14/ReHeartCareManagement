using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class BloodTestCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Hemoglobin { get; set; }
        [Required]
        public string Hematocrit { get; set; }
        [Required]
        public string WhiteBloodCell { get; set; }
        [Required]
        public string Platelets { get; set; }
        [Required]
        public string Glucose { get; set; }
        [Required]
        public string CholesterolHDL { get; set; }
        [Required]
        public string CholesterolLDL { get; set; }
        [Required]
        public string Triglycerides { get; set; }
        [Required]
        public string RedBloodCell { get; set; }
        [Required]
        public string MeanCorpuscularVolume { get; set; }
        [Required]
        public string MeanCorpuscularHemoglobin { get; set; }
        [Required]
        public string MeanCorpuscularHemoglobinConcentration { get; set; }
        [Required]
        public string RedCellDistributionWidth { get; set; }
        [Required]
        public string BloodUreaNitrogen { get; set; }
        [Required]
        public string Creatinine { get; set; }
        [Required]
        public string Sodium { get; set; }
        [Required]
        public string Potassium { get; set; }
        [Required]
        public string Chloride { get; set; }
        [Required]
        public string Bicarbonate { get; set; }
        [Required]
        public string Calcium { get; set; }
        [Required]
        public string Magnesium { get; set; }
        [Required]
        public string Neutrophils { get; set; }
        [Required]
        public string Lymphocytes { get; set; }
        [Required]
        public string Monocytes { get; set; }
        [Required]
        public string Eosinophils { get; set; }
        [Required]
        public string Basophils { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}