using Core.Entities.Identity;

namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        public string AppUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TimeSpan Time { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

        public AppUser AppUser { get; set; }

        public int AppointmentStatusId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }

        public int AppointmentTypeId { get; set; }
        public AppointmentType AppointmentType { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}