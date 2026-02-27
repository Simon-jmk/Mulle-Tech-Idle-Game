using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.ServerAPI
{
    public static class Endpoints
    {
        public static void MapEndpoints(this WebApplication app)
        {
            // Goal Endpoints
            app.MapPost("/set/goal/", (IdleLoggerDbContext db, UserGoal goal) =>
             {

             });

            app.MapPut("/update/goal/", (IdleLoggerDbContext db,  UserGoal goal) =>
            {
            });

            app.MapDelete("/delete/goal/{id}", (IdleLoggerDbContext db, ulong id) =>
            {
            });
            app.MapGet("/get/goals/{id}", (IdleLoggerDbContext db, ulong id) =>
           {
           });

            app.MapGet("/get/gamestate", (IdleLoggerDbContext db, GameState gameState) => 
            {
            });
            
            app.MapGet("/get/streak", (IdleLoggerDbContext db, StreakMilestone streak) => 
            {

            });


            app.MapPut("/complete/goal", (IdleLoggerDbContext db, UserGoal goal) =>
            {
            });


            // User Endpoints

            app.MapGet("/get/user/{id}", (IdleLoggerDbContext db, ulong id) =>
            {
            });

            app.MapPost("/create/user", (IdleLoggerDbContext db, User user) =>
            {
            });






        }
    }
}

