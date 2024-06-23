using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class DiagnosticCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string ConditionName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ClassificationCondition { get; set; }
        [Required]
        public string Severity { get; set; }
        [Required]
        public string RiskAssessment { get; set; }
        [Required]
        public string Conclusions { get; set; }
        [Required]
        public string Recommendations { get; set; }
        [Required]
        public string FollowUpPlan { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}