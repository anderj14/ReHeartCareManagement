using Core.Entities;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and retrieving patients with all related entities.
    /// </summary>
    public class PatientWithAllSpecification : BaseSpecification<Patient>
    {
        /// <summary>
        /// Creates a new specification to filter and retrieve patients based on provided parameters.
        /// </summary>
        /// <param name="patientParams">Parameters for filtering, sorting, and paging patients.</param>
        public PatientWithAllSpecification(PatientSpecParams patientParams)
            : base(x =>
                (string.IsNullOrEmpty(patientParams.Search) || x.PatientName.ToLower().Contains(patientParams.Search.ToLower()))
                && (!patientParams.StatusId.HasValue || x.StatusId == patientParams.StatusId)
            )
        {
            // Include all related entities for eager loading
            AddCommonIncludes();

            // Default ordering by PatientName
            AddOrderBy(p => p.PatientName);

            // Apply sorting based on the provided Sort parameter
            ApplySorting(patientParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific patient by ID.
        /// </summary>
        /// <param name="id">ID of the patient.</param>
        public PatientWithAllSpecification(int id)
            : base(x => x.Id == id)
        {
            // Include all related entities for eager loading
            AddCommonIncludes();
        }

        /// <summary>
        /// Private method to include all related entities for eager loading.
        /// </summary>
        private void AddCommonIncludes()
        {
            AddInclude(p => p.Appointments);
            AddInclude(p => p.BloodTests);
            AddInclude(p => p.CardiacCatheterizationStudies);
            AddInclude(p => p.Diagnostics);
            AddInclude(p => p.DiseaseHistories);
            AddInclude(p => p.Echocardiograms);
            AddInclude(p => p.Electrocardiograms);
            AddInclude(p => p.HolterStudies);
            AddInclude(p => p.MedicalHistories);
            AddInclude(p => p.PhysicalExaminations);
            AddInclude(p => p.StressTests);
            AddInclude(p => p.Treatments);
            AddInclude(p => p.CardiologySurgery);
            AddInclude(p => p.Prescription);
            AddInclude(p => p.PatientStatus);
        }

        /// <summary>
        /// Private method to apply sorting logic to the query.
        /// </summary>
        /// <param name="sort">Sorting criteria.</param>
        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "dobAsc":
                        AddOrderBy(p => p.DOB);
                        break;
                    case "dobDesc":
                        AddOrderByDescending(p => p.DOB);
                        break;
                    default:
                        AddOrderBy(n => n.PatientName);
                        break;
                }
            }
        }
    }
}
