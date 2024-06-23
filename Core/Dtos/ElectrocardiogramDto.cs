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
        public string Interpretation { get; set; }
        public string DetailedFindings { get; set; }
        public decimal BloodPressureSystolic { get; set; }
        public decimal BloodPressureDiastolic { get; set; }
        public decimal Temperature { get; set; }
        public string ClinicalNotes { get; set; }
        
        public string Patient { get; set; }
    }
}