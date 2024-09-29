using Core.Entities;

public class CardiacCatheterizationStudy : BaseEntity
{
    public DateTime Date { get; set; } // Date of the study
    public TimeSpan Time { get; set; } // Time of the study
    public string LocationMainCoronaryArteries { get; set; } // Location and number of main coronary arteries examined
    
    public decimal BlockageEachCoronaryArtery { get; set; } // Blockage percentage for each coronary artery
    
    public string DescriptionAbnormalities { get; set; } // Description of any abnormalities found
    public int SystolicPressureAorta { get; set; } // Systolic blood pressure in the aorta (mmHg)
    public int DiastolicPressureAorta { get; set; } // Diastolic blood pressure in the aorta (mmHg)

    // Observations in cardiac chambers could also be represented as numerical values
    public string ChambersLeftAtrium { get; set; } // Observations in the left atrium
    public string ChambersLeftVentricle { get; set; } // Observations in the left ventricle
    public string ChambersRightAtrium { get; set; } // Observations in the right atrium
    public string ChambersRightVentricle { get; set; } // Observations in the right ventricle

    public decimal BloodFlowCoronaryArteries { get; set; } // Blood flow in the coronary arteries (could be a flow rate)
    public decimal VelocityBloodFlow { get; set; } // Velocity of blood flow (cm/s)
    public decimal LeftVentricularEjectionFraction { get; set; } // Left ventricular ejection fraction (LVEF) (%)
    public int SystolicPressurePulmonaryArteries { get; set; } // Systolic blood pressure in the pulmonary arteries (mmHg)
    public int DiastolicPressurePulmonaryArteries { get; set; } // Diastolic blood pressure in the pulmonary arteries (mmHg)

    public string ValvularInsufficiencyAortic { get; set; } // Aortic valvular insufficiency details
    public string ValvularInsufficiencyMitral { get; set; } // Mitral valvular insufficiency details
    public string ValvularInsufficiencyPulmonary { get; set; } // Pulmonary valvular insufficiency details
    public string ValvularInsufficiencyTricuspid { get; set; } // Tricuspid valvular insufficiency details
    public decimal PressureGradientValves { get; set; } // Pressure gradient across valves (mmHg)
    public string StructuralAbnormalities { get; set; } // Structural abnormalities observed
    public string CardiacChamberFunctions { get; set; } // Functions of cardiac chambers
    public string DescriptionComplications { get; set; } // Description of any complications during the study
    public string Conclusion { get; set; } // Conclusion of the study

    public int PatientId { get; set; }
    public Patient Patient { get; set; }

    public ICollection<Photo> CardiacCathStudyImages { get; set; } = new List<Photo>();
}
