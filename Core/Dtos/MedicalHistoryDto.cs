namespace Core.Dtos
{
    public class MedicalHistoryDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool PreviousHeartDisease { get; set; }
        public bool HighBloodPressure { get; set; }
        public bool Diabetes { get; set; }
        public bool Hyperlipidemia { get; set; }
        public bool Obesity { get; set; }
        public bool Smoking { get; set; }
        public string CardiacProcedures { get; set; }
        public string SystemicDiseases { get; set; }
        public string Medications { get; set; }
        public string FamilyDiseases { get; set; }
        public string OtherDetails { get; set; }
        public string Patient { get; set; }
    }
}