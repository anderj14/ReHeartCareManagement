namespace Core.Dtos
{
    public class SurgeryFollowUpDto
    {
        public int Id { get; set; }
        public DateTime FollowUpDate { get; set; }
        public string FollowUpNotes { get; set; }
        public string Complications { get; set; }
        public string FollowUpComplete { get; set; }
        public string CardiologySurgery { get; set; }
    }
}