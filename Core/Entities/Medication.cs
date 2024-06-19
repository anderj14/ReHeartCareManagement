
namespace Core.Entities
{
    public class Medication : BaseEntity
    {
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Route { get; set; }
        public string Notes { get; set; }

        public int SurgeryFollowUpId { get; set; }
        public SurgeryFollowUp SurgeryFollowUp { get; set; }
    }
}