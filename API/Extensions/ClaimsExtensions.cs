
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user?.Identity?.Name ?? null;
        }
    }
}