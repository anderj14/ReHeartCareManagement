
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class HolterStudyCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string StudyDuration { get; set; }
        [Required]
        public string AverageHeartRate { get; set; }
        [Required]
        public string MaximumHeartRate { get; set; }
        [Required]
        public string TypeHeartRhythm { get; set; }
        [Required]
        public string ArrhythmiaEpisodes { get; set; }
        [Required]
        public string PhysicalActivity { get; set; }
        [Required]
        public string PatientSymptoms { get; set; }
        [Required]
        public string Conclusion { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}