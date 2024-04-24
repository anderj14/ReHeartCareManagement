namespace Core.Dtos
{
    public class DiagnosticDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string ConditionName { get; set; }
        public string Description { get; set; }
        public string ClassificationCondition { get; set; }
        public string Severity { get; set; }
        public string RiskAssessment { get; set; }
        public string Conclusions { get; set; }
        public int PatientId { get; set; }
    }
}