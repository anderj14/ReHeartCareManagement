
namespace Core.Dtos
{
    public class DiseaseHistoryDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string Treatment { get; set; }
        public string Diagnosis { get; set; }
        public string Severity { get; set; }
        public string Notes { get; set; }
        public bool IsChronic { get; set; }
        public string DoctorName { get; set; }
        public string Patient { get; set; }
        public ICollection<AttachmentDto> Attachments { get; set; }
    }
}