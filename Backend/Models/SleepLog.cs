using System.Data.SqlTypes;

namespace Backend.Models
{
	public class SleepLog
	{
		public ulong Id { get; set; }
		public ulong UserId { get; set; }
		public SqlDecimal Hours { get; set; }
		public ushort Quality
		{
			get { return Quality; }
			set
			{
				if (value > 5) { Quality = 5; }
				if (value < 1) { Quality = 1; }
			} 
		}

		public virtual User? User { get; set; }
	}
}
