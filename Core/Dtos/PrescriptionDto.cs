
namespace Core.Dtos
{
    public class PrescriptionDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string MedicationName { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Route { get; set; }
        public string Notes { get; set; }
        public string Patient { get; set; }
    }
}