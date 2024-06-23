
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class CardiacCathStudyCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string LocationMainCoronaryArteries { get; set; }
        [Required]
        public string BlockageEachCoronaryArtery { get; set; }
        [Required]
        public string DescriptionAbnormalities { get; set; }
        [Required]
        public string BloodPressureAorta { get; set; }
        [Required]
        public string ChambersLeftAtrium { get; set; }
        [Required]
        public string ChambersLeftVentricle { get; set; }
        [Required]
        public string ChambersRightAtrium { get; set; }
        [Required]
        public string ChambersRightVentricle { get; set; }
        [Required]
        public string BloodFlowCoronaryArteries { get; set; }
        [Required]
        public string VelocityBloodFlow { get; set; }
        [Required]
        public string LeftVentricularEjectionFraction { get; set; }
        [Required]
        public string BloodPressurePulmonaryArteries { get; set; }
        [Required]
        public string ValvularInsufficiencyAortic { get; set; }
        [Required]
        public string ValvularInsufficiencyMitral { get; set; }
        [Required]
        public string ValvularInsufficiencyPulmonary { get; set; }
        [Required]
        public string ValvularInsufficiencyTricuspid { get; set; }
        [Required]
        public string PressureGradientValves { get; set; }
        [Required]
        public string StructuralAbnormalities { get; set; }
        [Required]
        public string CardiacChamberFunctions { get; set; }
        [Required]
        public string DescriptionComplications { get; set; }
        [Required]
        public string Conclusion { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}