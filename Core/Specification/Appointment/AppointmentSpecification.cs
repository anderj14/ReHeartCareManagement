using Core.Entities;

namespace Core.Specification
{
    public class AppointmentSpecification : BaseSpecification<Appointment>
    {
        public AppointmentSpecification(AppointmentSpecParams appointmentParams)
            : base(x =>
            (string.IsNullOrEmpty(appointmentParams.Search) || x.Patient.PatientName.ToLower().Contains(appointmentParams.Search))
            && (!appointmentParams.AppointmentStatusId.HasValue || x.AppointmentStatusId == appointmentParams.AppointmentStatusId)
            && (!appointmentParams.AppointmentTypeId.HasValue || x.AppointmentTypeId == appointmentParams.AppointmentTypeId)
            )
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppUser);
            AddInclude(a => a.AppointmentStatus);
            AddInclude(a => a.AppointmentType);

            // ApplyPaging(appointmentParams.PageSize * (appointmentParams.PageIndex - 1),
            // appointmentParams.PageSize);

            if (!string.IsNullOrEmpty(appointmentParams.Sort))
            {
                switch (appointmentParams.Sort)
                {
                    case "dateStart":
                        AddOrderBy(a => a.StartDate);
                        break;
                    case "dateEnd":
                        AddOrderByDescending(a => a.EndDate);
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
            AddInclude(a => a.AppointmentType);
        }
        public AppointmentSpecification(int id)
            : base(a => a.Id == id)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
            AddInclude(a => a.AppointmentType);
        }
        public AppointmentSpecification(int id, bool getByPatientId = false)
        : base(a => getByPatientId ? a.PatientId == id : a.Id == id)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.AppointmentStatus);
            AddInclude(a => a.AppointmentType);
        }

        // public AppointmentSpecification(DateTime date)
        //     : base(a => a.Date.Date == date.Date)
        // {
        //     AddInclude(a => a.Patient);
        //     AddInclude(a => a.AppointmentStatus);
        //     AddOrderBy(a => a.Date);
        // }
    }
}