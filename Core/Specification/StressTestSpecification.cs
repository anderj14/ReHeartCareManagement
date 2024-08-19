using Core.Entities;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and retrieving stress tests.
    /// </summary>
    public class StressTestSpecification : BaseSpecification<StressTest>
    {

        /// <summary>
        /// Creates a new specification to retrieve all stress tests for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        public StressTestSpecification(int id)
            : base(a => a.Id == id)
        {
            // Include related entity Patient for eager loading
            AddInclude(a => a.Patient);
        }


        /// <summary>
        /// Creates a new specification to retrieve stress tests for a patient with pagination and sorting.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        public StressTestSpecification(int patientId, BaseSpecParams baseSpecParams)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);

            // Apply sorting based on the provided Sort parameter
            ApplySorting(baseSpecParams.Sort);

            // Apply paging based on provided PageIndex and PageSize
            ApplyPaging((baseSpecParams.PageIndex - 1) * baseSpecParams.PageSize, baseSpecParams.PageSize);
        }


        /// <summary>
        /// Creates a new specification to retrieve a specific stress test for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="stressTestId">ID of the stress test.</param>
        public StressTestSpecification(int patientId, int stressTestId)
            : base(a => a.PatientId == patientId && a.Id == stressTestId)
        {
            AddInclude(a => a.Patient);
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
