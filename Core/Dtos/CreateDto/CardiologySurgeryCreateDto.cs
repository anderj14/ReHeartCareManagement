
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
        public bool IsEmergency { get; set; }
        public bool IsElective { get; set; }
        [Required]
        public string OperationRoom { get; set; }
        [Required]
        public string PreOpDiagnosis { get; set; }
        [Required]
        public string PostOpDiagnosis { get; set; }
        public bool IsSuccessful { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public string CardiacCondition { get; set; }
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