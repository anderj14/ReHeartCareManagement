namespace Core.Entities
{
    public class SurgeryFollowUp : BaseEntity
    {
        public DateTime FollowUpDate { get; set; }
        public string FollowUpNotes { get; set; }
        public string Complications { get; set; }
        public string Recommendations { get; set; }
        public string FunctionalAssessment { get; set; }
        public bool IsFollowUpComplete { get; set; }

        public int CardiologySurgeryId { get; set; }
        public CardiologySurgery CardiologySurgery { get; set; }

        public ICollection<Medication> MedicationsPrescribed { get; set; } = new List<Medication>();

        public SurgeryFollowUp()
        {
            IsFollowUpComplete = false;
        }
    }
}