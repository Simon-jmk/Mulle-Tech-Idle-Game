namespace Backend.Models
{
	public class ShopItem
	{
		public ulong Id { get; set; }
		public string Name { get; set; } = null!;
		public string? Description { get; set; }
		public ulong Cost { get; set; }
	}
}
