using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class IdleLoggerDbContext : DbContext
    {
        public IdleLoggerDbContext()
        {

        }
        public IdleLoggerDbContext(DbContextOptions<IdleLoggerDbContext> options) : base(options)
        {

        }

        public virtual DbSet<User> Users { get; set; }

    }
}
