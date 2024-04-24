namespace Core.Dtos
{
    public class ElectrocardiogramDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string HeartRhythm { get; set; }
        public string IntervalsSegments { get; set; }
        public string CharacteristicWaves { get; set; }
        public string HeartRate { get; set; }
        public string Abnormalities { get; set; }
        public string Artifacts { get; set; }
        public int PatientId { get; set; }
    }
}