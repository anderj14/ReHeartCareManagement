using Core.Entities;

namespace Core.Specification
{
    public class AppointmentSpecification : BaseSpecification<Appointment>
    {
        // Constructor to filter with search parameters, appointment status, and type.
        public AppointmentSpecification(AppointmentSpecParams appointmentParams)
        : base(x =>
        (string.IsNullOrEmpty(appointmentParams.Search) || x.Patient.PatientName.ToLower().Contains(appointmentParams.Search))
        && (!appointmentParams.AppointmentStatusId.HasValue || x.AppointmentStatusId == appointmentParams.AppointmentStatusId)
        && (!appointmentParams.AppointmentTypeId.HasValue || x.AppointmentTypeId == appointmentParams.AppointmentTypeId)
        )
        {
            AddCommonIncludes();
            ApplySorting(appointmentParams.Sort);
        }
        // Constructor to get a specific appointment by Id.
        public AppointmentSpecification(int id)
        : base(a => a.Id == id)
        {
            AddCommonIncludes();
        }

        // Constructor to get a specific appointment by patient ID and appointment ID.
        public AppointmentSpecification(int patientId, int appointmentId)
        : base(a => a.PatientId == patientId && a.Id == appointmentId)
        {
            AddCommonIncludes();
        }

        // Constructor to get an appointment by ID or by patient ID.
        public AppointmentSpecification(int id, bool getByPatientId = false)
        : base(a => getByPatientId ? a.PatientId == id : a.Id == id)
        {
            AddCommonIncludes();
        }

        // Private method to add common includes.
        private void AddCommonIncludes()
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
            AddInclude(a => a.AppointmentType);
            AddInclude(a => a.AppUser);
        }

        // Private method to apply sorting logic.
        private void ApplySorting(string sort)
        {

            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "dateStart":
                        AddOrderBy(a => a.StartDate);
                        break;
                    case "dateEnd":
                        AddOrderByDescending(a => a.EndDate);
                        break;
                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;
                }
            }
        }
    }
}