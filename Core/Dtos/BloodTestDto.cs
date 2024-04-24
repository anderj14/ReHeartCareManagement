namespace Core.Dtos
{
    public class BloodTestDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Hemoglobin { get; set; }
        public string Hematocrit { get; set; }
        public string WhiteBloodCell { get; set; }
        public string Platelets { get; set; }
        public string Glucose { get; set; }
        public string CholesterolHDL { get; set; }
        public string CholesterolLDL { get; set; }
        public string Triglycerides { get; set; }
        public string Patient { get; set; }
    }
}