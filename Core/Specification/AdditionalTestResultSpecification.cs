
using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class AdditionalTestResultSpecification : BaseSpecification<AdditionalTestResult>
    {
        public AdditionalTestResultSpecification(int id) : base(ats => ats.Id == id)
        {
            AddInclude(ats => ats.HolterStudy);
            AddInclude(ats => ats.HolterStudy.Patient);
        }
    }
}