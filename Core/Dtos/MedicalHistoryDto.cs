namespace Core.Dtos
{
    public class MedicalHistoryDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string PreviousHeartDisease { get; set; }
        public string HighBloodPressure { get; set; }
        public string Diabetes { get; set; }
        public string Hyperlipidemia { get; set; }
        public string Obesity { get; set; }
        public string Smoking { get; set; }
        public string CardiacProceduresSurgeries { get; set; }
        public string SystemicDiseases { get; set; }
        public string Medications { get; set; }
        public string FamilyDiseases { get; set; }
        public int PatientId { get; set; }
    }
}