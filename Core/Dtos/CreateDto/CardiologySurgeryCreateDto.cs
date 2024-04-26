
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
        public string IsEmergency { get; set; }
        [Required]
        public string IsElective { get; set; }
        [Required]
        public string OperationRoom { get; set; }
        [Required]
        public string PreOpDiagnosis { get; set; }
        [Required]
        public string PostOpDiagnosis { get; set; }
        [Required]
        public string IsSuccessful { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public string CardiacCondition { get; set; }
        [Required]
        public string IsMinimallyInvasive { get; set; }
        [Required]
        public int PatientId { get; set; }
    }
}