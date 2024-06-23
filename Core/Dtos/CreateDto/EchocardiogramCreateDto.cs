using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class EchocardiogramCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string CardiacDimensions { get; set; }
        [Required]
        public string EjectionFraction { get; set; }
        [Required]
        public string ValveFunction { get; set; }
        [Required]
        public string VelocitiesBloodFlows { get; set; }
        [Required]
        public string MovementCardiacWalls { get; set; }
        [Required]
        public string PulmonaryArterialPressure { get; set; }
        [Required]
        public string BloodFlow { get; set; }
        [Required]
        public string Indications { get; set; }
        [Required]
        public string Findings { get; set; }
        [Required]
        public string ClinicalImpression { get; set; }
        [Required]
        public string TechnicalDetails { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}