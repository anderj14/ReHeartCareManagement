namespace Core.Entities
{
    public class CardiacCatheterizationStudy : BaseEntity
    {
        public DateTime Date { get; set; } // Date of the study
        public TimeSpan Time { get; set; } // Time of the study
        public string LocationMainCoronaryArteries { get; set; } // Location and number of main coronary arteries examined
        public string BlockageEachCoronaryArtery { get; set; } // Blockage percentage for each coronary artery
        public string DescriptionAbnormalities { get; set; } // Description of any abnormalities found
        public string BloodPressureAorta { get; set; } // Blood pressure in the aorta
        public string ChambersLeftAtrium { get; set; } // Observations in the left atrium
        public string ChambersLeftVentricle { get; set; } // Observations in the left ventricle
        public string ChambersRightAtrium { get; set; } // Observations in the right atrium
        public string ChambersRightVentricle { get; set; } // Observations in the right ventricle
        public string BloodFlowCoronaryArteries { get; set; } // Blood flow in the coronary arteries
        public string VelocityBloodFlow { get; set; } // Velocity of blood flow
        public string LeftVentricularEjectionFraction { get; set; } // Left ventricular ejection fraction (LVEF)
        public string BloodPressurePulmonaryArteries { get; set; } // Blood pressure in the pulmonary arteries
        public string ValvularInsufficiencyAortic { get; set; } // Aortic valvular insufficiency details
        public string ValvularInsufficiencyMitral { get; set; } // Mitral valvular insufficiency details
        public string ValvularInsufficiencyPulmonary { get; set; } // Pulmonary valvular insufficiency details
        public string ValvularInsufficiencyTricuspid { get; set; } // Tricuspid valvular insufficiency details
        public string PressureGradientValves { get; set; } // Pressure gradient across valves
        public string StructuralAbnormalities { get; set; } // Structural abnormalities observed
        public string CardiacChamberFunctions { get; set; } // Functions of cardiac chambers
        public string DescriptionComplications { get; set; } // Description of any complications during the study
        public string Conclusion { get; set; } // Conclusion of the study

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Photo> CardiacCathStudyImages { get; set; } = new List<Photo>();
    }
}