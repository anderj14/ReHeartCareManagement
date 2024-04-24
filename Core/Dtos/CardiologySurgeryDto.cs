namespace Core.Dtos
{
    public class CardiologySurgeryDto
    {
        public int Id { get; set; }
        public string SurgeryName { get; set; }
        public DateTime Date { get; set; }
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
        public string Patient { get; set; }
    }
}