namespace Core.Entities
{
    public class Electrocardiogram : BaseEntity
    {
        public DateTime Date { get; set; }
        public string HeartRhythm { get; set; }
        public string IntervalsSegments { get; set; }
        public string CharacteristicWaves { get; set; }
        public string HeartRate { get; set; }
        public string Abnormalities { get; set; }
        public string Artifacts { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}