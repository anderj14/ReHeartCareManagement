using Core.Entities;

namespace Core.Specification
{
    public class PatientWithFiltersForCountSpecification : BaseSpecification<Patient>
    {
        // Constructor for specifying the filter criteria used for counting patients
        public PatientWithFiltersForCountSpecification(PatientSpecParams patientParams)
            : base(x =>
                // Filter based on the Search parameter
                string.IsNullOrEmpty(patientParams.Search) || x.PatientName.ToLower()
                .Contains(patientParams.Search.ToLower())
                && (!patientParams.StatusId.HasValue || x.StatusId == patientParams.StatusId) // Check if StatusId matches
            )
        {
        }
    }
}
