using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    /// <summary>
    /// Specification for filtering and retrieving Holter studies.
    /// </summary>
    public class HolterStudySpecification : BaseSpecification<HolterStudy>
    {
        /// <summary>
        /// Creates a new specification to retrieve a Holter study by its ID.
        /// </summary>
        /// <param name="id">ID of the Holter study.</param>
        public HolterStudySpecification(int id)
            : base(hs => hs.Id == id)
        {
            AddInclude(hs => hs.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve Holter studies for a patient, with pagination and sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        public HolterStudySpecification(int patientId, BaseSpecParams baseSpecParams)
            : base(a => a.PatientId == patientId)
        {
            AddCommonIncludes();
            ApplySorting(baseSpecParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific Holter study for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="holterStudyId">ID of the holter study.</param>
        public HolterStudySpecification(int patientId, int holterStudyId)
            : base(a => a.PatientId == patientId && a.Id == holterStudyId)
        {
            AddCommonIncludes();
        }

        /// <summary>
        /// Private method to add common includes in Holter study queries.
        /// </summary>
        private void AddCommonIncludes()
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.ArrhythmiaEvents);
            AddInclude(a => a.MedicationAdministrations);
            AddInclude(a => a.PatientSymptoms);
            AddInclude(a => a.ClinicalEvaluations);
            AddInclude(a => a.AdditionalTestResults);
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
