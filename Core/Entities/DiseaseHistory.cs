namespace Core.Entities
{
    public class DiseaseHistory : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string Treatment { get; set; }
        public string Diagnosis { get; set; }
        public string Severity { get; set; }
        public string Notes { get; set; }
        public bool IsChronic { get; set; }
        public string DoctorName { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Attachment> Attachments { get; set; }
    }
}