namespace Core.Entities
{
    public class DiseaseHistory : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string Treatment { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}