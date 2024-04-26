using Core.Entities.Identity;

namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        public string AppUserId { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Description { get; set; }
        public AppUser AppUser { get; set; }

        public int AppointmentStatusId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}