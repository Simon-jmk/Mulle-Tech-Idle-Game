using System.Data.SqlTypes;

namespace Backend.Models
{
	public class StreakMilestone
	{
		public ulong Id { get; set; }
		public int StreakDays { get; set; }
		public SqlDecimal Multiplier { get; set; }
		public string Description { get; set; } = null!;
	}
}
