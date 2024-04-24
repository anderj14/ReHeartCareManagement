namespace Core.Dtos
{
    public class CardiacCatheterizationStudyDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string NumLocationMainCoronary { get; set; }
        public string BlockageEachCoronaryArtery { get; set; }
        public string DescriptionAbnormality { get; set; }
        public string BloodPressureAorta { get; set; }
        public string ChambersLeftAtrium { get; set; }
        public string ChambersLeftVentricle { get; set; }
        public string ChambersRightAtrium { get; set; }
        public string ChambersRightVentricle { get; set; }
        public string BloodFlowCoronaryArteries { get; set; }
        public string VelocityBloodFlow { get; set; }
        public string LeftVentricularEjectionFraction { get; set; }
        public string BloodPressurePulmonaryArteries { get; set; }
        public string ValvularInsufficiencyAortic { get; set; }
        public string ValvularInsufficiencyMitral { get; set; }
        public string ValvularInsufficiencyPulmonary { get; set; }
        public string ValvularInsufficiencyTricuspid { get; set; }
        public string PressureGradientValves { get; set; }
        public string StructuralAbnormalities { get; set; }
        public string FunctionsCardiacChambers { get; set; }
        public string DescriptionComplication { get; set; }
        public string Conclusion { get; set; }
        public int PatientId { get; set; }
    }
}