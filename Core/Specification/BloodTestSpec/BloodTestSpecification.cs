
using Core.Entities;
using Core.Specification.BloodTestSpec;

namespace Core.Specification
{
    public class BloodTestSpecification : BaseSpecification<BloodTest>
    {
        public BloodTestSpecification(BloodTestSpecParams bloodTestParams)
            : base(x =>
            (string.IsNullOrEmpty(bloodTestParams.Search) || x.Patient.PatientName.ToLower().Contains
            (bloodTestParams.Search))
            && (!bloodTestParams.Date.HasValue || x.Date.Date == bloodTestParams.Date.Value.Date)
            )
        {
            AddInclude(b => b.Patient);
            ApplyPaging(bloodTestParams.PageSize * (bloodTestParams.PageIndex - 1),
            bloodTestParams.PageSize);

            if (!string.IsNullOrEmpty(bloodTestParams.Sort))
            {
                switch (bloodTestParams.Sort)
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

        public BloodTestSpecification(int patientId, int bloodTestId)
            : base(bt => bt.PatientId == patientId && bt.Id == bloodTestId)
        {
            AddInclude(bt => bt.Patient);
        }

        public BloodTestSpecification(int id)
        : base(bt => bt.Id == id)
        {
            AddInclude(bt => bt.Patient);
        }
        public BloodTestSpecification(int id, bool getByPatientId = false)
        : base(a => getByPatientId ? a.PatientId == id : a.Id == id)
        {
            AddInclude(a => a.Patient);
        }

        public BloodTestSpecification(DateTime date)
            : base(a => a.Date.Date == date.Date)
        {
            AddInclude(a => a.Patient);
            AddOrderBy(a => a.Date);
        }
    }
}