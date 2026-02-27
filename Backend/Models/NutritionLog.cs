using System.Data.SqlTypes;

namespace Backend.Models
{
	public class NutritionLog
	{
		public ulong Id { get; set; }
		public ulong UserId { get; set; }
		public SqlDecimal Calories { get; set; } = 0;
		public SqlDecimal ProteinGrams { get; set; } = 0;
		public SqlDecimal CarbsGrams { get; set; } = 0;
		public SqlDecimal FatGrams { get; set; } = 0;
		public DateTime LoggedAt { get; set; } = DateTime.Now;

		public virtual User? User { get; set; }
	}
}
