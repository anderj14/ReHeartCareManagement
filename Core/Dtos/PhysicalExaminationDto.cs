namespace Core.Dtos
{
    public class PhysicalExaminationDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Duration { get; set; }
        public string MaxHeartRate { get; set; }
        public string PeakPressure { get; set; }
        public string ExerciseInducedSymptoms { get; set; }
        public string AbnormalEcgFindings { get; set; }
        public string ImageEcoUrl { get; set; }
        public string ImageStresUrl { get; set; }
        public string Conclusion { get; set; }
        public string Patient { get; set; }

        public IEnumerable<PhotoDto> PhotosImageEco { get; set; } = new List<PhotoDto>();
        public IEnumerable<PhotoDto> PhotosImageStress { get; set; } = new List<PhotoDto>();
    }
}