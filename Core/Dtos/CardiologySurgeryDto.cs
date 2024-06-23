using Core.Entities;

namespace Core.Dtos
{
    public class CardiologySurgeryDto
    {
        public int Id { get; set; }
        public string SurgeryName { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string ProcedureDescription { get; set; }
        public string Notes { get; set; }
        public bool IsEmergency { get; set; }
        public bool IsElective { get; set; }
        public string OperationRoom { get; set; }
        public string PreOpDiagnosis { get; set; }
        public string PostOpDiagnosis { get; set; }
        public bool IsSuccessful { get; set; }
        public decimal Duration { get; set; }
        public string CardiacCondition { get; set; }
        public bool IsMinimallyInvasive { get; set; }
        public string Complications { get; set; }
        public string PostOperativeStatus { get; set; }
        public string AnesthesiaType { get; set; }
        public string SurgicalTeam { get; set; }
        public string IntraoperativeFindings { get; set; }
        public string PostOperativeInstructions { get; set; }
        public ICollection<SurgeryFollowUp> SurgeryFollowUps { get; set; } = new List<SurgeryFollowUp>();

        public string Patient { get; set; }
    }
}