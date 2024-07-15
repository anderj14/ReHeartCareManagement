
namespace Core.Specification
{
    public class PatientSpecParams
    {
        private const int MaxPageSize = 100;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 8;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize || value <= 0) ? MaxPageSize : value;
        }

        // Optional status filter for patients
        public int? StatusId { get; set; }

        // Sorting criteria
        public string Sort { get; set; }

        private string _search;
        public string? Search
        {
            get => _search;
            set => _search = value?.ToLower();
        }
    }
}