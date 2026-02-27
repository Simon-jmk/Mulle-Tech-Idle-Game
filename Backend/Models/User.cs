namespace Backend.Models
{
    public class User
    {
        public uint Id { get; set; }
        public string Email { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public virtual ICollection<GameState>? GameStates { get; set; }
        public virtual ICollection<ScoreLog>? ScoreLogs { get; set; }
        public virtual ICollection<UserGoal>? Goals { get; set; }
        public virtual ICollection<SleepLog>? SleepLogs { get; set; }
        public virtual ICollection<NutritionLog>? NutritionLogs { get; set; }
        public virtual ICollection<UserPurchase>? UserPurchases { get; set; }
    }
}
