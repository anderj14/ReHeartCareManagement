
namespace Core.Specification.DiagnosticSpec
{
    public class DiagnosticSpecParams
    {
        private const int MaxPageSize = 100;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        // Sorting criteria
        public string Sort { get; set; }
    }
}