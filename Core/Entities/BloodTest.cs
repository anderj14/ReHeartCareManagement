namespace Core.Entities
{
    public class BloodTest : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Hemoglobin { get; set; }
        public string Hematocrit { get; set; }
        public string WhiteBloodCell { get; set; }
        public string Platelets { get; set; }
        public string Glucose { get; set; }
        public string CholesterolHDL { get; set; }
        public string CholesterolLDL { get; set; }
        public string Triglycerides { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}