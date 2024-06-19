
namespace Core.Entities.HolterStudyInfo
{
    public class ClinicalEvaluation: BaseEntity
    {
        public DateTime EvaluationDateTime { get; set; }
        public string Findings { get; set; }
        public string Recommendations { get; set; }

        public int HolterStudyId { get; set; }
        public HolterStudy HolterStudy { get; set; }
    }
}