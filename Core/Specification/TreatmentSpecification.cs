using Core.Entities;
using Core.Specification;

namespace Core.Specifications
{
    public class TreatmentSpecification : BaseSpecification<Treatment>
    {
        /// <summary>
        /// Constructor to retrieve all treatments for a patient.
        /// This constructor is useful when you need to list all treatments for a particular patient.
        /// </summary>
        /// <param name="patientId">ID of the patient whose treatments you want to retrieve.</param>
        public TreatmentSpecification(int id)
            : base(a => a.Id == id)
        {
            // Include the Patient entity to access patient information
            AddInclude(a => a.Patient);
        }

        /// <summary>
        /// Constructor to retrieve treatments with additional pagination and filtering parameters.
        /// This constructor allows you to paginate results and apply additional filters according to client needs.
        /// </summary>
        /// <param name="patientId">ID of the patient whose treatments you want to retrieve.</param>
        /// <param name="treatmentParams">Additional parameters for pagination and filtering.</param>
        public TreatmentSpecification(int patientId, BaseSpecParams baseSpecParams)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);

            // Order results by treatment order
            ApplySorting(baseSpecParams.Sort);

            // Apply pagination
            // ApplyPaging(baseSpecParams.PageSize * (baseSpecParams.PageIndex - 1), baseSpecParams.PageSize);
        }

        /// <summary>
        /// Constructor to retrieve a specific treatment for a patient.
        /// This constructor is useful when you need to find a treatment by its ID and the patient ID.
        /// </summary>
        /// <param name="patientId">ID of the patient who owns the treatment.</param>
        /// <param name="treatmentId">ID of the specific treatment.</param>
        public TreatmentSpecification(int patientId, int treatmentId)
            : base(a => a.PatientId == patientId && a.Id == treatmentId)
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
