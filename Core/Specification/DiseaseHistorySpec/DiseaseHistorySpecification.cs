using Core.Entities;
using Core.Specification.DiseaseHistorySpec;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and sorting DiseaseHistory entities.
    /// </summary>
    public class DiseaseHistorySpecification : BaseSpecification<DiseaseHistory>
    {
        /// <summary>
        /// Initializes a new specification for a DiseaseHistory entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the DiseaseHistory entity.</param>
        public DiseaseHistorySpecification(int id)
            : base(dh => dh.Id == id)
        {
            AddCommonIncludes();
        }

        /// <summary>
        /// Initializes a new specification for DiseaseHistory entities by patient ID and additional parameters.
        /// </summary>
        /// <param name="patientId">The ID of the patient.</param>
        /// <param name="diseaseHistorySpecParams">The parameters for filtering and sorting DiseaseHistory entities.</param>
        public DiseaseHistorySpecification(int patientId, DiseaseHistorySpecParams diseaseHistorySpecParams)
            : base(dh => dh.PatientId == patientId)
        {
            AddCommonIncludes();
            ApplySorting(diseaseHistorySpecParams.Sort);
        }

        /// <summary>
        /// Initializes a new specification for a specific DiseaseHistory entity by patient ID and DiseaseHistory ID.
        /// </summary>
        /// <param name="patientId">The ID of the patient.</param>
        /// <param name="diseaseHistoryId">The ID of the DiseaseHistory entity.</param>
        public DiseaseHistorySpecification(int patientId, int diseaseHistoryId)
            : base(dh => dh.PatientId == patientId && dh.Id == diseaseHistoryId)
        {
            AddCommonIncludes();
        }

        /// <summary>
        /// Adds common includes for all specifications.
        /// Includes Patient and Attachments related entities.
        /// </summary>
        private void AddCommonIncludes()
        {
            AddInclude(dh => dh.Patient);
            AddInclude(dh => dh.Attachments);
        }

        /// <summary>
        /// Applies sorting based on the provided sorting criteria.
        /// </summary>
        /// <param name="sort">The sorting criteria (e.g., "dateAsc", "dateDesc").</param>
        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.StartDate);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(a => a.StartDate);
                        break;
                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;
                }
            }
        }
    }
}
