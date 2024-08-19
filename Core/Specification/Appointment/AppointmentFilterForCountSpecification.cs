
using Core.Entities;

namespace Core.Specification
{
    public class AppointmentFilterForCountSpecification : BaseSpecification<Appointment>
    {
        // Constructor for specifying the filter criteria used for counting appointments
        public AppointmentFilterForCountSpecification(AppointmentSpecParams appointmentParams)
            : base(
                x => string.IsNullOrEmpty(appointmentParams.Search) || x.Patient.PatientName.ToLower().Contains(appointmentParams.Search)
                && (!appointmentParams.AppointmentStatusId.HasValue || x.AppointmentStatusId == appointmentParams.AppointmentStatusId)
            )
        {
        }
    }
}