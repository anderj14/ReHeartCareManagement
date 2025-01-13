
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class CardiacCathStudyCreateDto
    {
        [Required]
        public DateTime Date { get; set; } // Date of the study
        [Required]
        public TimeSpan Time { get; set; } = new TimeSpan(0, 0, 0); // Time of the study
        [Required]
        public string LocationMainCoronaryArteries { get; set; } // Location and number of main coronary arteries examined

        [Required]
        public decimal BlockageEachCoronaryArtery { get; set; } // Blockage percentage for each coronary artery

        [Required]
        public string DescriptionAbnormalities { get; set; } // Description of any abnormalities found
        [Required]
        public int SystolicPressureAorta { get; set; } // Systolic blood pressure in the aorta (mmHg)
        [Required]
        public int DiastolicPressureAorta { get; set; } // Diastolic blood pressure in the aorta (mmHg)

        [Required]
        public string ChambersLeftAtrium { get; set; } // Observations in the left atrium
        [Required]
        public string ChambersLeftVentricle { get; set; } // Observations in the left ventricle
        [Required]
        public string ChambersRightAtrium { get; set; } // Observations in the right atrium
        [Required]
        public string ChambersRightVentricle { get; set; } // Observations in the right ventricle

        [Required]
        public decimal BloodFlowCoronaryArteries { get; set; } // Blood flow in the coronary arteries (could be a flow rate)
        [Required]
        public decimal VelocityBloodFlow { get; set; } // Velocity of blood flow (cm/s)
        [Required]
        public decimal LeftVentricularEjectionFraction { get; set; } // Left ventricular ejection fraction (LVEF) (%)
        [Required]
        public int SystolicPressurePulmonaryArteries { get; set; } // Systolic blood pressure in the pulmonary arteries (mmHg)
        [Required]
        public int DiastolicPressurePulmonaryArteries { get; set; } // Diastolic blood pressure in the pulmonary arteries (mmHg)

        [Required]
        public string ValvularInsufficiencyAortic { get; set; } // Aortic valvular insufficiency details
        [Required]
        public string ValvularInsufficiencyMitral { get; set; } // Mitral valvular insufficiency details
        [Required]
        public string ValvularInsufficiencyPulmonary { get; set; } // Pulmonary valvular insufficiency details
        [Required]
        public string ValvularInsufficiencyTricuspid { get; set; } // Tricuspid valvular insufficiency details
        [Required]
        public decimal PressureGradientValves { get; set; } // Pressure gradient across valves (mmHg)
        [Required]
        public string StructuralAbnormalities { get; set; } // Structural abnormalities observed
        [Required]
        public string CardiacChamberFunctions { get; set; } // Functions of cardiac chambers
        [Required]
        public string DescriptionComplications { get; set; } // Description of any complications during the study
        [Required]
        public string Conclusion { get; set; } // Conclusion of the study

        [Required]
        public int PatientId { get; set; } // ID of the associated patient
    }
}