namespace Core.Dtos
{
    public class StressTestDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Duration { get; set; }
        public string MaxHeartRate { get; set; }
        public string PeakPressure { get; set; }
        public string ExerciseInducedSymptoms { get; set; }
        public string AbnormalEcgFindings { get; set; }
        public string ImageEco { get; set; }
        public string ImageStress { get; set; }
        public string Conclusion { get; set; }
        public int PatientId { get; set; }
    }
}