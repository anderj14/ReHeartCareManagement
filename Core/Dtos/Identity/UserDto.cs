
namespace Core.Dtos.Identity
{
    public class UserDto
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public List<PhotoDto> Photos { get; set; }
    }
}