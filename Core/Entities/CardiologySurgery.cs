using Core.Entities.Identity;

namespace Core.Entities
{
    public class CardiologySurgery : BaseEntity
    {
        public string AppUserId { get; set; }

        public string SurgeryName { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string ProcedureDescription { get; set; }
        public string Notes { get; set; }
        public bool IsEmergency { get; set; }
        public bool IsElective { get; set; }
        public string OperationRoom { get; set; }
        public string PreOpDiagnosis { get; set; }
        public string PostOpDiagnosis { get; set; }
        public bool IsSuccessful { get; set; }
        public decimal Duration { get; set; }
        public string CardiacCondition { get; set; }
        public bool IsMinimallyInvasive { get; set; }
        public string Complications { get; set; }
        public string PostOperativeStatus { get; set; }
        public string AnesthesiaType { get; set; }
        public string SurgicalTeam { get; set; }
        public string IntraoperativeFindings { get; set; }
        public string PostOperativeInstructions { get; set; }

        public AppUser AppUser { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<Photo> SurgeryPhotos { get; set; } = new List<Photo>();
    }

}