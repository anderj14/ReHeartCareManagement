using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {

        public Photo Photo { get; set; }

        public ICollection<Notes> Notes { get; set; } = new List<Notes>();
        public ICollection<Patient> Patients { get; set; } = new List<Patient>();
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<CardiologySurgery> CardiologySurgeries { get; set; } = new List<CardiologySurgery>();
    }
}