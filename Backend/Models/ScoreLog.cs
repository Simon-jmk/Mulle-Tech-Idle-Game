namespace Backend.Models
{
	public class ScoreLog
	{
		public ulong Id { get; set; }
		public ulong UserId { get; set; }
		public long Amount { get; set; }
		public enum Reason
		{
			sleep_logged, nutrition_logged, goal_completted, streak_bonus, passive_income, click
		}
		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}
