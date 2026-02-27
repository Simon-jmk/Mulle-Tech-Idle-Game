using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<GameState>(e => e.ToTable("game_state"));
            builder.Entity<NutritionLog>(e => e.ToTable("nutrition_logs"));
            builder.Entity<SleepLog>(e => e.ToTable("sleep_logs"));
            builder.Entity<ScoreLog>(e => e.ToTable("score_log"));
            builder.Entity<ShopItem>(e => e.ToTable("shop_items"));
            builder.Entity<StreakMilestone>(e => e.ToTable("streak_milestones"));
            builder.Entity<User>(e => e.ToTable("users"));
            builder.Entity<UserGoal>(e => e.ToTable("goals"));
            builder.Entity<UserPurchase>(e => e.ToTable("user_purchases"));
        }
    }
}
