using Core.Entities;

namespace Core.Specification.BloodTestSpec
{
    public class BloodTestFilterForCountSpecification : BaseSpecification<BloodTest>
    {
        public BloodTestFilterForCountSpecification(BloodTestSpecParams bloodTestParams)
            : base(x =>
                string.IsNullOrEmpty(bloodTestParams.Search) || x.Patient.PatientName.ToLower().Contains(bloodTestParams.Search)
                && (!bloodTestParams.Date.HasValue || x.Date.Date == bloodTestParams.Date.Value.Date)
                )
        {
        }
    }
}