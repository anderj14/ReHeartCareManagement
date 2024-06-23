namespace Core.Dtos
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TimeSpan Time { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string AppointmentStatus { get; set; }
        public string AppointmentType { get; set; }
        public string Patient { get; set; }
        public string PatientEmail { get; set; }
        public long PatientPhone { get; set; }
        public string PatientAddress { get; set; }
        public string UserDoctor { get; set; }
    }
}