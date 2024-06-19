
namespace Core.Entities
{
    public class Prescription: BaseEntity
    {
        public DateTime Date { get; set; }
        public string MedicationName { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Route { get; set; }
        public string Notes { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}