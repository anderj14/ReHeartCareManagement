using Core.Entities;

namespace Core.Specification.NoteSpec
{
    public class NoteWithFiltersForCountSpecification : BaseSpecification<Notes>
    {
        public NoteWithFiltersForCountSpecification(NoteSpecParams notesParams)
            : base(x =>
            (string.IsNullOrEmpty(notesParams.Search) || x.Title.ToLower().Contains(notesParams.Search)) &&
            (!notesParams.NoteStatusId.HasValue || x.NoteStatusId == notesParams.NoteStatusId)
            )
        {
        }
    }
}