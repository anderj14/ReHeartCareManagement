namespace Core.Entities
{
    public class HolterStudy : BaseEntity
    {
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string StudyDuration { get; set; }
        public string AverageHeartRate { get; set; }
        public string MaximumHeartRate { get; set; }
        public string TypeHeartRhythm { get; set; }
        public string ArrhythmiaEpisodes { get; set; }
        public string PhysicalActivity { get; set; }
        public string PatientSymptoms { get; set; }
        public string Conclusion { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}