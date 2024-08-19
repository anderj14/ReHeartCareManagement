using Core.Entities;

namespace Core.Specification.DiagnosticSpec
{
    /// <summary>
    /// Specification for filtering and retrieving diagnostics.
    /// </summary>
    public class DiagnosticSpecification : BaseSpecification<Diagnostic>
    {
        /// <summary>
        /// Creates a new specification to retrieve a diagnostic by its ID.
        /// </summary>
        /// <param name="id">ID of the diagnostic.</param>
        public DiagnosticSpecification(int id)
            : base(d => d.Id == id)
        {
            // Include related entities for eager loading
            AddInclude(d => d.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve diagnostics for a patient, with sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="diagnosticSpecParams">Sorting parameters.</param>
        public DiagnosticSpecification(int patientId, DiagnosticSpecParams diagnosticSpecParams)
            : base(d => d.PatientId == patientId)
        {
            AddInclude(d => d.Patient);

            // Apply sorting based on the provided Sort parameter
            ApplySorting(diagnosticSpecParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific diagnostic for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="diagnosticId">ID of the diagnostic.</param>
        public DiagnosticSpecification(int patientId, int diagnosticId)
            : base(d => d.PatientId == patientId && d.Id == diagnosticId)
        {
            AddInclude(d => d.Patient);
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
