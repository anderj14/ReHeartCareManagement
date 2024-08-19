using Core.Entities;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and retrieving electrocardiograms.
    /// </summary>
    public class ElectrocardiogramSpecification : BaseSpecification<Electrocardiogram>
    {
        /// <summary>
        /// Creates a new specification to retrieve an electrocardiogram by its ID.
        /// </summary>
        /// <param name="id">ID of the electrocardiogram.</param>
        public ElectrocardiogramSpecification(int id)
            : base(e => e.Id == id)
        {
            // Include the related patient entity in the query
            AddInclude(e => e.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve electrocardiograms for a specific patient,
        /// with pagination and sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        public ElectrocardiogramSpecification(int patientId, BaseSpecParams baseSpecParams)
            : base(a => a.PatientId == patientId)
        {
            // Include the related patient entity in the query
            AddInclude(a => a.Patient);
            // Apply sorting based on the provided sorting criteria
            ApplySorting(baseSpecParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific electrocardiogram for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="electrocardiogramId">ID of the electrocardiogram.</param>
        public ElectrocardiogramSpecification(int patientId, int electrocardiogramId)
            : base(a => a.PatientId == patientId && a.Id == electrocardiogramId)
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
