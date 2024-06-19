namespace Core.Entities
{
    public class Echocardiogram : BaseEntity
    {
        public DateTime Date { get; set; }
        public string CardiacDimensions { get; set; }
        public string EjectionFraction { get; set; }
        public string ValveFunction { get; set; }
        public string VelocitiesBloodFlows { get; set; }
        public string MovementCardiacWalls { get; set; }
        public string PulmonaryArterialPressure { get; set; }
        public string BloodFlow { get; set; }
        public string Indications { get; set; }
        public string Findings { get; set; }
        public string ClinicalImpression { get; set; }
        public string TechnicalDetails { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Photo> PhotosImageEco { get; set; } = new List<Photo>();

    }
}