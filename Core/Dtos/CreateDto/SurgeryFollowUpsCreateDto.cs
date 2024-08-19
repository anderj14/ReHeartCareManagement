using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class SurgeryFollowUpsCreateDto
    {
        [Required]
        public DateTime FollowUpDate { get; set; }
        [Required]
        public string FollowUpNotes { get; set; }
        [Required]
        public string Complications { get; set; }
        [Required]
        public string Recommendations { get; set; }
        [Required]
        public string FunctionalAssessment { get; set; }
        public bool IsFollowUpComplete { get; set; }
        [Required]
        public int CardiologySurgeryId { get; set; }
    }
}