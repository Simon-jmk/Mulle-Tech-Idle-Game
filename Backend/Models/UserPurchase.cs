namespace Backend.Models
{
	public class UserPurchase
	{
		public ulong id { get; set; }
		public ulong UserId { get; set; }
		public ulong ItemId { get; set; }
		public DateTime PurchasedAt { get; set; } = DateTime.Now;
	}
}
