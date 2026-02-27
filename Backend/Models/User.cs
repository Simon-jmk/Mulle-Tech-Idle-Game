using System.Data.SqlTypes;

namespace Backend.Models
{
    public class User
    {
        public uint UserId { get; set; }
        public string Email { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
