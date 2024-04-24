using Core.Entities;

namespace Core.Specification
{
    public class AppointmentSpecification : BaseSpecification<Appointment>
    {
        public AppointmentSpecification(AppointmentSpecParams appointmentParams)
            : base(x =>
            (string.IsNullOrEmpty(appointmentParams.Search) || x.Patient.PatientName.ToLower().Contains
            (appointmentParams.Search))
            // && (appointmentParams.Date == null || x.Date.Date == appointmentParams.Date.Value.Date)
            && (!appointmentParams.Date.HasValue || x.Date.Date == appointmentParams.Date.Value.Date)
            && (!appointmentParams.AppointmentStatusId.HasValue || x.AppointmentStatusId == appointmentParams.AppointmentStatusId)
            )
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);

            ApplyPaging(appointmentParams.PageSize * (appointmentParams.PageIndex - 1),
            appointmentParams.PageSize);

            if (!string.IsNullOrEmpty(appointmentParams.Sort))
            {
                switch (appointmentParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.Date);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(a => a.Date);
                        break;
                    case "timeAsc":
                        AddOrderBy(a => a.Time);
                        break;
                    case "timeDesc":
                        AddOrderByDescending(a => a.Time);
                        break;

                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;
                }
            }
        }

        public AppointmentSpecification(int patientId, int appointmentId)
            : base(a => a.PatientId == patientId && a.Id == appointmentId)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
        }
        public AppointmentSpecification(int id)
            : base(a => a.Id == id)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
        }
        public AppointmentSpecification(int id, bool getByPatientId = false)
        : base(a => getByPatientId ? a.PatientId == id : a.Id == id)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
        }

        public AppointmentSpecification(DateTime date)
            : base(a => a.Date.Date == date.Date)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
            AddOrderBy(a => a.Date);
        }
    }
}