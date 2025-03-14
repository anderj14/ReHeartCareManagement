
namespace Core.Dtos.HolterStudyDtos
{
    public class PatientSymptomDto
    {
        public int Id { get; set; }
        public string SymptomName { get; set; }
        public DateTime SymptomDateTime { get; set; }
        public string Description { get; set; }
        public int HolterStudyId { get; set; }
    }
}