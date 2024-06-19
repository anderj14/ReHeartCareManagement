
namespace Core.Entities.HolterStudyInfo
{
    public class MedicationAdministration : BaseEntity
    {
        public string MedicationName { get; set; }
        public DateTime AdministrationDateTime { get; set; }
        public string Dosage { get; set; }

        public int HolterStudyId { get; set; }
        public HolterStudy HolterStudy { get; set; }
    }
}