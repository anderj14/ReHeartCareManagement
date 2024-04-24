namespace Core.Entities
{
    public class Appointment : BaseEntity
    {
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Description { get; set; }

        public int AppointmentStatusId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}