

using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class ElectrocardiogramCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string HeartRhythm { get; set; }
        [Required]
        public string IntervalsSegments { get; set; }
        [Required]
        public string CharacteristicWaves { get; set; }
        [Required]
        public string HeartRate { get; set; }
        [Required]
        public string Abnormalities { get; set; }
        [Required]
        public string Artifacts { get; set; }
        [Required]
        public string Interpretation { get; set; }
        [Required]
        public string DetailedFindings { get; set; }
        [Required]
        public decimal BloodPressureSystolic { get; set; }
        [Required]
        public decimal BloodPressureDiastolic { get; set; }
        [Required]
        public decimal Temperature { get; set; }
        [Required]
        public string ClinicalNotes { get; set; }

        [Required]
        public int PatientId { get; set; }
    }
}