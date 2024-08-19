using Core.Entities;

namespace Core.Specification.NoteSpec
{
    /// <summary>
    /// Specification for filtering and retrieving notes.
    /// </summary>
    public class NoteSpecification : BaseSpecification<Notes>
    {
        /// <summary>
        /// Creates a new specification to filter and retrieve notes based on provided parameters.
        /// </summary>
        /// <param name="notesParams">Parameters for filtering, sorting, and paging notes.</param>
        public NoteSpecification(NoteSpecParams notesParams)
            : base(x =>
                string.IsNullOrEmpty(notesParams.Search) || x.Title.ToLower().Contains(notesParams.Search.ToLower())
            )
        {
            // Include related entities for eager loading
            AddInclude(n => n.NoteStatus);

            // Apply pagination based on provided page size and index
            ApplyPaging(notesParams.PageSize * (notesParams.PageIndex - 1), notesParams.PageSize);

            // Apply sorting based on the provided Sort parameter
            if (!string.IsNullOrEmpty(notesParams.Sort))
            {
                switch (notesParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.Date);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(a => a.Date);
                        break;
                    default:
                        AddOrderBy(n => n.Title);
                        break;
                }
            }
        }

        /// <summary>
        /// Creates a new specification to retrieve a specific note by ID.
        /// </summary>
        /// <param name="id">ID of the note.</param>
        public NoteSpecification(int id)
            : base(n => n.Id == id)
        {
            AddInclude(n => n.NoteStatus);
        }
    }
}
