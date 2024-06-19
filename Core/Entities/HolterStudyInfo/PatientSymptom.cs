
namespace Core.Entities.HolterStudyInfo
{
    public class PatientSymptom : BaseEntity
    {
        public string SymptomName { get; set; }
        public DateTime SymptomDateTime { get; set; }
        public string Description { get; set; }

        public int HolterStudyId { get; set; }
        public HolterStudy HolterStudy { get; set; }
    }
}