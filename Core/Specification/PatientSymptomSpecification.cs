
using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class PatientSymptomSpecification : BaseSpecification<PatientSymptom>
    {
        public PatientSymptomSpecification(int id)
        : base(p => p.Id == id)
        {
            AddInclude(p => p.HolterStudy);
            AddInclude(p => p.HolterStudy.Patient);
        }
    }
}