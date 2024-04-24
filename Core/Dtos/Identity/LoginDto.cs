using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.Identity
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}