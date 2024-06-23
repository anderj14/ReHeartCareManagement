
namespace Core.Dtos.HolterStudyDtos
{
    public class MedicationAdministrationDto
    {
        public int Id { get; set; }
        public string MedicationName { get; set; }
        public DateTime AdministrationDateTime { get; set; }
        public string Dosage { get; set; }
    }
}