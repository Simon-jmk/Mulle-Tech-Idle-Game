using System.Data.SqlTypes;

namespace Backend.Models
{
	public class GameState
	{
		public ulong GameStateId { get; set; }
		public ulong UserId { get; set; }
		public long Score { get; set; } = 0;
		public int StreakSleep { get; set; } = 0;
		public int StreakNutrition { get; set; } = 0;
		public long PassiveScorePerHour { get; set; } = 0;
		public SqlDecimal CurrentMultiplier { get; set; } = 0;
		public DateOnly? LastLoginDate { get; set; } = null;
		public DateOnly? LastLoggedDate { get; set; } = null;
		public DateTime LastSeenAt { get; set; }

		public virtual User? User { get; set; }
	}
}
