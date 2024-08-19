
using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class MedicationAdministrationSpecification : BaseSpecification<MedicationAdministration>
    {
        public MedicationAdministrationSpecification(int id)
        : base(m => m.Id == id)
        {
            AddInclude(m => m.HolterStudy);
            AddInclude(m => m.HolterStudy.Patient);
        }
    }
}