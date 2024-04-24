
using Core.Entities;

namespace Core.Specification
{
    public class PatientWithFiltersForCountSpecification : BaseSpecification<Patient>
    {
        public PatientWithFiltersForCountSpecification(PatientSpecParams patientParams)
            : base(x =>
                string.IsNullOrEmpty(patientParams.Search) || x.PatientName.ToLower()
                .Contains(patientParams.Search)
            )
        {

        }
    }
}