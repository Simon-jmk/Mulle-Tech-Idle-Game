using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTO;

namespace Backend.Services
{
    public static class UserGoalServices
    {
        public static async Task<IResult> GetGoal(IdleLoggerDbContext dB, ulong userId)
        {
            var result = await dB.Goals.Where(g => g.UserId == userId).ToListAsync();

            if (result == null || result.Count <= 0)
            {
                return Results.NotFound();
            }

            return Results.Ok(result);
        }

        public static async Task<IResult> PostGoal(IdleLoggerDbContext dB, UserGoalDTO goalDto)
        {
            UserGoal newGoal = new UserGoal
            {
                UserId = goalDto.UserId,
                Type = goalDto.Type,
                CurrentValue = goalDto.CurrentValue,
                TargetValue = goalDto.TargetValue,
                CompletedAt = null
            };

            await dB.Goals.AddAsync(newGoal);
            await dB.SaveChangesAsync();
            return Results.Created();
        }

        public static async Task<IResult> PutGoal(IdleLoggerDbContext dB, UserGoalDTO goalDto)
        {
            var result = await dB.Goals.FirstOrDefaultAsync(g => g.UserId == goalDto.UserId);
            if (result == null)
            {
                Results.NotFound();
            }
            result!.Type = goalDto.Type;
            result!.TargetValue = goalDto.TargetValue;
            result!.CurrentValue = goalDto.CurrentValue;
            result!.CompletedAt = goalDto.CompletedAt;

            dB.Goals.Update(result);
            await dB.SaveChangesAsync();
            return Results.Ok(result);
        }

        public static async Task<IResult> DeleteGoal(IdleLoggerDbContext dB, ulong goalId)
        {
            var result = await dB.Goals.FirstOrDefaultAsync(g => g.Id == goalId);
            if (result == null)
            {
                Results.NotFound();
            }
            dB.Goals.Remove(result!);
            await dB.SaveChangesAsync();
            return Results.NoContent();
        }
    }
}
