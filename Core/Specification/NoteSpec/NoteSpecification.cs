using Core.Entities;

namespace Core.Specification.NoteSpec
{
    public class NoteSpecification : BaseSpecification<Notes>
    {

        public NoteSpecification(NoteSpecParams notesParams)
         : base(x =>
            (string.IsNullOrEmpty(notesParams.Search) || x.Title.ToLower().Contains
            (notesParams.Search))
        )
        {

            ApplyPaging(notesParams.PageSize * (notesParams.PageIndex - 1),
            notesParams.PageSize);

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
                    // case "timeAsc":
                    //     AddOrderBy(a => a.Time);
                    //     break;
                    // case "timeDesc":
                    //     AddOrderByDescending(a => a.Time);
                    //     break;

                    default:
                        AddOrderBy(n => n.Title);
                        break;
                }
            }
        }

        public NoteSpecification(int id)
        :base(n => n.Id == id)
        {
        }
    }
}