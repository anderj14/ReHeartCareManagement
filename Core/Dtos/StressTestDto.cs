namespace Core.Dtos
{
    public class StressTestDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Duration { get; set; }
        public string MaxHeartRate { get; set; }
        public string PeakPressure { get; set; }
        public string ExerciseInducedSymptoms { get; set; }
        public int RestingHeartRate { get; set; }
        public decimal MaxBloodPressureSystolic { get; set; }
        public decimal MaxBloodPressureDiastolic { get; set; }
        public string ExerciseProtocol { get; set; }
        public string Indications { get; set; }
        public string AbnormalEcgFindings { get; set; }
        public string Conclusion { get; set; }
        public string Patient { get; set; }
    }
}