namespace Core.Dtos
{
    public class EchocardiogramDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string CardiacDimensions { get; set; }
        public string EjectionFraction { get; set; }
        public string ValveFunction { get; set; }
        public string VelocitiesBloodFlows { get; set; }
        public string MovementCardiacWalls { get; set; }
        public string PulmonaryArterialPressure { get; set; }
        public string BloodFlow { get; set; }
        public int PatientId { get; set; }
    }
}