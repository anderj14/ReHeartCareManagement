
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class CardiologySurgeryCreateDto
    {
        [Required]
        public string SurgeryName { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Time { get; set; }
        [Required]
        public string ProcedureDescription { get; set; }
        [Required]
        public string Notes { get; set; }
        [Required]
        public bool IsEmergency { get; set; }
        [Required]
        public bool IsElective { get; set; }
        [Required]
        public string OperationRoom { get; set; }
        [Required]
        public string PreOpDiagnosis { get; set; }
        [Required]
        public string PostOpDiagnosis { get; set; }
        [Required]
        public bool IsSuccessful { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public string CardiacCondition { get; set; }
        [Required]
        public bool IsMinimallyInvasive { get; set; }
        [Required]
        public string Complications { get; set; }
        [Required]
        public string PostOperativeStatus { get; set; }
        [Required]
        public string AnesthesiaType { get; set; }
        [Required]
        public string SurgicalTeam { get; set; }
        [Required]
        public string IntraoperativeFindings { get; set; }
        [Required]
        public string PostOperativeInstructions { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}