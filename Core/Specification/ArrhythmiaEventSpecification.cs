
using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class ArrhythmiaEventSpecification : BaseSpecification<ArrhythmiaEvent>
    {
        public ArrhythmiaEventSpecification(int id)
        : base(a => a.Id == id)
        {
            AddInclude(a => a.HolterStudy);
            AddInclude(e => e.HolterStudy.Patient);
        }
    }
}