using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
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

        public virtual DbSet<GameState> GameStates { get; set; }
        public virtual DbSet<NutritionLog> NutritionLogs { get; set; }
        public virtual DbSet<ScoreLog> ScoreLogs { get; set; }
        public virtual DbSet<ShopItem> ShopItems { get; set; }
        public virtual DbSet<SleepLog> SleepLogs { get; set; }
        public virtual DbSet<StreakMilestone> StreakMilestones { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserGoal> Goals { get; set; }
        public virtual DbSet<UserPurchase> UserPurchases { get; set; }

    }
}
