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
        public int PatientId { get; set; }
    }
}