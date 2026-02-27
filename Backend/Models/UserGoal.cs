using System.Data.SqlTypes;

namespace Backend.Models
{
	public class UserGoal
	{
		public ulong Id { get; set; }
		public ulong UserId { get; set; }
		public string Type { get; set; } = null!;
		public SqlDecimal TargetValue { get; set; }
		public SqlDecimal CurrentValue { get; set; }
		public DateTime? CompletedAt { get; set; } = null;
		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public virtual User? User { get; set; }
	}
}
