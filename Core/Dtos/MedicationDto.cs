
namespace Core.Dtos
{
    public class MedicationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Route { get; set; }
        public string Notes { get; set; }

        public int SurgeryFollowUpId { get; set; }
    }
}