namespace Core.Entities
{
    public class Treatment : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Medication { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
        public string OtherTreatments { get; set; }
        public string SideEffects { get; set; }
        public string TreatmentMonitoring { get; set; }
        public string TreatmentDuration { get; set; }
        public string TreatmentOutcome { get; set; }
        
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}