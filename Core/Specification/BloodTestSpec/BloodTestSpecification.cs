
using Core.Entities;
using Core.Specification.BloodTestSpec;

namespace Core.Specification
{
    public class BloodTestSpecification : BaseSpecification<BloodTest>
    {

        // Constructor to get an cardiac catheterization study by ID or by patient ID and params.
        public BloodTestSpecification(int id)
            : base(bt => bt.Id == id)
        {
            AddInclude(bt => bt.Patient);
        }

        // Constructor to get a specific blood test by patient ID and blood test ID.
        public BloodTestSpecification(int patientId, int bloodTestId)
        : base(bt => bt.PatientId == patientId && bt.Id == bloodTestId)
        {
            AddInclude(bt => bt.Patient);
        }

        // Constructor to get an blood test by ID or by patient ID and params.
        public BloodTestSpecification(int patientId, BloodTestSpecParams bloodTestParams)
        : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
            ApplySorting(bloodTestParams.Sort);
        }

        // Private method to apply sorting logic.
        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.Date);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(a => a.Date);
                        break;
                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;
                }
            }
        }
    }
}