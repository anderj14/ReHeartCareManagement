using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class TreatmentCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Medication { get; set; }
        [Required]
        public string Dosage { get; set; }
        [Required]
        public string Instructions { get; set; }
        [Required]
        public string OtherTreatments { get; set; }
        [Required]
        public string SideEffects { get; set; }
        [Required]
        public string TreatmentMonitoring { get; set; }
        [Required]
        public string TreatmentDuration { get; set; }
        [Required]
        public string TreatmentOutcome { get; set; }

        [Required]
        public int PatientId { get; set; }
    }
}