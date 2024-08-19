using Core.Entities;

namespace Core.Specification.EchocardiogramSpec
{
    /// <summary>
    /// Specification for filtering and retrieving echocardiograms.
    /// </summary>
    public class EchocardiogramSpecification : BaseSpecification<Echocardiogram>
    {
        /// <summary>
        /// Creates a new specification to retrieve an echocardiogram by its ID.
        /// </summary>
        /// <param name="id">ID of the echocardiogram.</param>
        public EchocardiogramSpecification(int id)
            : base(e => e.Id == id)
        {
            // Include related entities for eager loading
            AddInclude(e => e.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve echocardiograms for a patient, with pagination and sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="specParams">Pagination and sorting parameters.</param>
        public EchocardiogramSpecification(int patientId, BaseSpecParams specParams)
            : base(e => e.PatientId == patientId)
        {
            AddInclude(e => e.Patient);

            // Apply sorting based on the provided Sort parameter
            ApplySorting(specParams.Sort);

            ApplyPaging((specParams.PageIndex - 1) * specParams.PageSize, specParams.PageSize);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific echocardiogram for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="echocardiogramId">ID of the echocardiogram.</param>
        public EchocardiogramSpecification(int patientId, int echocardiogramId)
            : base(e => e.PatientId == patientId && e.Id == echocardiogramId)
        {
            AddInclude(e => e.Patient);
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
