using Core.Entities;

namespace Core.Specification.CardiologySurgerySpec
{
    /// <summary>
    /// This class defines specifications for querying CardiologySurgery entities,
    /// including filtering, sorting, and including related entities.
    /// </summary>
    public class CardiologySurgerySpecification : BaseSpecification<CardiologySurgery>
    {
        /// <summary>
        /// Constructor to filter cardiology surgeries based on search parameters.
        /// It filters by patient name if the search parameter is provided.
        /// </summary>
        /// <param name="cardiologySurgeryParams">Parameters for filtering and sorting cardiology surgeries.</param>
        public CardiologySurgerySpecification(CardiologySurgerySpecParams cardiologySurgeryParams)
            : base(x =>
            string.IsNullOrEmpty(cardiologySurgeryParams.Search) || x.Patient.PatientName.ToLower()
            .Contains(cardiologySurgeryParams.Search)
            )
        {
            AddCommonIncludes(); // Add common includes like Patient and SurgeryFollowUps.
            ApplySorting(cardiologySurgeryParams.Sort); // Apply sorting based on the provided sort parameter.
        }

        /// <summary>
        /// Constructor to get a cardiology surgery by its ID.
        /// </summary>
        /// <param name="id">The ID of the cardiology surgery.</param>
        public CardiologySurgerySpecification(int id)
        : base(a => a.Id == id)
        {
            AddCommonIncludes();
        }

        /// <summary>
        /// Constructor to get a specific cardiology surgery by patient ID and surgery ID.
        /// </summary>
        /// <param name="patientId">The ID of the patient.</param>
        /// <param name="cardiologySurgeryId">The ID of the cardiology surgery.</param>
        public CardiologySurgerySpecification(int patientId, int cardiologySurgeryId)
            : base(cs => cs.PatientId == patientId && cs.Id == cardiologySurgeryId)
        {
            AddCommonIncludes();
        }

        /// <summary>
        /// Constructor to get a cardiology surgery by ID or by patient ID, based on the flag getByPatientId.
        /// </summary>
        /// <param name="id">The ID of the surgery or patient.</param>
        /// <param name="getByPatientId">Flag to determine if the query is by patient ID or surgery ID.</param>
        public CardiologySurgerySpecification(int id, bool getByPatientId = false)
            : base(a => getByPatientId ? a.PatientId == id : a.Id == id)
        {
            AddCommonIncludes(); // Add common includes like Patient and SurgeryFollowUps.
        }

        /// <summary>
        /// Adds common includes for related entities, such as Patient and SurgeryFollowUps,
        /// that are commonly used in cardiology surgery queries.
        /// </summary>
        private void AddCommonIncludes()
        {
            AddInclude(cs => cs.Patient);
            AddInclude(cs => cs.SurgeryFollowUps); // Include the related SurgeryFollowUps entity.
        }

        /// <summary>
        /// Applies sorting logic based on the provided sort parameter.
        /// If no sort parameter is provided, the default sort is by patient name.
        /// </summary>
        /// <param name="sort">The sorting criteria (e.g., dateAsc, dateDesc).</param>
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
