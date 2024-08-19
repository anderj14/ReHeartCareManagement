using Core.Entities;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and retrieving physical examinations.
    /// </summary>
    public class PhysicalExaminationSpecification : BaseSpecification<PhysicalExamination>
    {
        /// <summary>
        /// Creates a new specification to retrieve a physical examination by its ID.
        /// </summary>
        /// <param name="id">ID of the physical examination.</param>
        public PhysicalExaminationSpecification(int id)
            : base(pe => pe.Id == id)
        {
            // Include the related patient entity in the query
            AddInclude(pe => pe.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve physical examinations for a specific patient,
        /// with pagination and sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        public PhysicalExaminationSpecification(int patientId, BaseSpecParams baseSpecParams)
            : base(a => a.PatientId == patientId)
        {
            // Include the related patient entity in the query
            AddInclude(a => a.Patient);
            // Apply sorting based on the provided sorting criteria
            ApplySorting(baseSpecParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific physical examination for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="physicalExaminationId">ID of the physical examination.</param>
        public PhysicalExaminationSpecification(int patientId, int physicalExaminationId)
            : base(a => a.PatientId == patientId && a.Id == physicalExaminationId)
        {
            // Include the related patient entity in the query
            AddInclude(a => a.Patient);
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
