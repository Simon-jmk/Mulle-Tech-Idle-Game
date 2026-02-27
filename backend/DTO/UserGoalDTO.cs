using System.Data.SqlTypes;

namespace Backend.DTO
{
    public class UserGoalDTO
    {
        public ulong UserId { get; set; }
        public string Type { get; set; } = null!;
        public SqlDecimal TargetValue { get; set; }
        public SqlDecimal CurrentValue { get; set; }
        public DateTime? CompletedAt { get; set; } = null;
    }
}
