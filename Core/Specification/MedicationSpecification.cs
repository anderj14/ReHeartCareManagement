
using Core.Entities;

namespace Core.Specification
{
    public class MedicationSpecification: BaseSpecification<Medication>
    {
        public MedicationSpecification(int id)
        : base(m => m.Id == id)
        {
            AddInclude(m => m.SurgeryFollowUp);
            AddInclude(m => m.SurgeryFollowUp.CardiologySurgery);
        }
    }
}