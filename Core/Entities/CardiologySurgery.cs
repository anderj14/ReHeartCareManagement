namespace Core.Entities
{
    public class CardiologySurgery : BaseEntity
    {
        public string SurgeryName { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string ProcedureDescription { get; set; }
        public string Notes { get; set; }
        public string IsEmergency { get; set; }
        public string IsElective { get; set; }
        public string OperationRoom { get; set; }
        public string PreOpDiagnosis { get; set; }
        public string PostOpDiagnosis { get; set; }
        public string IsSuccessful { get; set; }
        public int Duration { get; set; }
        public string CardiacCondition { get; set; }
        public string IsMinimallyInvasive { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }

}