
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class MedicalHistoryCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string PreviousHeartDisease { get; set; }
        [Required]
        public string HighBloodPressure { get; set; }
        [Required]
        public string Diabetes { get; set; }
        [Required]
        public string Hyperlipidemia { get; set; }
        [Required]
        public string Obesity { get; set; }
        [Required]
        public string Smoking { get; set; }
        [Required]
        public string CardiacProceduresSurgeries { get; set; }
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