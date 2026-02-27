using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string[] corsUrl = [""];
            string server = "localhost";
            string database = "db";
            string user = "IdleGameLogger";
            string password = "rootpassword";
            string connectionString = $"Server={server};Port=3306;Database={database};User={user};Pwd={password};";

            ServerVersion serverVersion = new MariaDbServerVersion(new Version(11,0));

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Idle Game", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<IdleLoggerDbContext>(options =>
            {
                options.UseMySql(connectionString, serverVersion);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseCors("Idle Game");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            

            app.Run();
        }
    }
}
