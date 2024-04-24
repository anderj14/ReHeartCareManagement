namespace Core.Dtos
{
    public class TreatmentDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Medication { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
        public string OtherTreatments { get; set; }
        public string SideEffects { get; set; }
        public string TreatmentMonitoring { get; set; }
        public int PatientId { get; set; }
    }
}