
using Core.Entities;

namespace Core.Specification
{
    public class MedicalHistorySpecification : BaseSpecification<MedicalHistory>
    {
        /// <summary>
        /// Creates a new specification to retrieve a medical history by its ID.
        /// </summary>
        /// <param name="id">ID of the medical history.</param>
        public MedicalHistorySpecification(int id)
            : base(a => a.Id == id)
        {
            AddInclude(a => a.Patient);
        }

        /// <summary>
        /// Creates a new specification to retrieve medical histories for a patient, with pagination and sorting parameters.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        public MedicalHistorySpecification(int patientId, BaseSpecParams baseSpecParams)
                  : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
            ApplySorting(baseSpecParams.Sort);
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific medical history for a patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="holterStudyId">ID of the holter study.</param>
        public MedicalHistorySpecification(int patientId, int medicalHistoryId)
            : base(a => a.PatientId == patientId && a.Id == medicalHistoryId)
        {
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