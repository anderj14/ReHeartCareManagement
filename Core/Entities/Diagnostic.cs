namespace Core.Entities
{
    public class Diagnostic : BaseEntity
    {
        public DateTime Date { get; set; }
        public string ConditionName { get; set; }
        public string Description { get; set; }
        public string ClassificationCondition { get; set; }
        public string Severity { get; set; }
        public string RiskAssessment { get; set; }
        public string Conclusions { get; set; }
        public string Recommendations { get; set; }
        public string FollowUpPlan { get; set; }
        
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}