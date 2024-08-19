
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class MedicalHistoryCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public bool PreviousHeartDisease { get; set; }
        [Required]
        public bool HighBloodPressure { get; set; }
        [Required]
        public bool Diabetes { get; set; }
        [Required]
        public bool Hyperlipidemia { get; set; }
        [Required]
        public bool Obesity { get; set; }
        [Required]
        public bool Smoking { get; set; }
        [Required]
        public string CardiacProcedures { get; set; }
        [Required]
        public string SystemicDiseases { get; set; }
        [Required]
        public string Medications { get; set; }
        [Required]
        public string FamilyDiseases { get; set; }
        [Required]
        public string OtherDetails { get; set; }

        [Required]
        public int PatientId { get; set; }
    }
}