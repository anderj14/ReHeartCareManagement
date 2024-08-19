
using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class ClinicalEvaluationSpecification : BaseSpecification<ClinicalEvaluation>
    {
        public ClinicalEvaluationSpecification(int id)
        : base(ce => ce.Id == id)
        {
            AddInclude(ce => ce.HolterStudy);
            AddInclude(ce => ce.HolterStudy.Patient);
        }
    }
}