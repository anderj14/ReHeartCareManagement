using Core.Entities;

namespace Core.Dtos
{
    public class SurgeryFollowUpDto
    {
        public int Id { get; set; }
        public DateTime FollowUpDate { get; set; }
        public string FollowUpNotes { get; set; }
        public string Complications { get; set; }
        public string FunctionalAssessment { get; set; }
        public bool IsFollowUpComplete { get; set; }
        public string CardiologySurgery { get; set; }
        public ICollection<Medication> MedicationsPrescribed { get; set; }
    }
}