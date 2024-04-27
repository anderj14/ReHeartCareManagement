using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class StressTestCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string Duration { get; set; }
        [Required]
        public string MaxHeartRate { get; set; }
        [Required]
        public string PeakPressure { get; set; }
        [Required]
        public string ExerciseInducedSymptoms { get; set; }
        [Required]
        public string AbnormalEcgFindings { get; set; }
        [Required]
        public string ImageEco { get; set; }
        [Required]
        public string ImageStress { get; set; }
        [Required]
        public string Conclusion { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}