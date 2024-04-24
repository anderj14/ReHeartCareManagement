using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser: IdentityUser
    {
        public ICollection<Notes> Notes {get; set;} = new List<Notes>();
    }
}