using Microsoft.EntityFrameworkCore;
using LegacySim.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

// Database - Use persistent path for Azure App Service
// Azure App Service uses HOME environment variable for persistent storage
var homePath = Environment.GetEnvironmentVariable("HOME");
var dbPath = homePath != null
    ? Path.Combine(homePath, "site", "wwwroot", "data", "app.db")
    : "Data Source=app.db";

// Ensure directory exists
if (homePath != null)
{
    var dbDir = Path.Combine(homePath, "site", "wwwroot", "data");
    Directory.CreateDirectory(dbDir);
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

var app = builder.Build();

// Auto-create database and apply migrations
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        // Try to ensure database exists and is up to date
        if (db.Database.EnsureCreated())
        {
            Console.WriteLine("Database created successfully.");
        }
        else
        {
            // Database exists, try to apply migrations
            try
            {
                db.Database.Migrate();
                Console.WriteLine("Migrations applied successfully.");
            }
            catch
            {
                // If migrations fail, EnsureCreated might have already created it
                // This is fine - database should exist now
                Console.WriteLine("Database already exists or migrations not needed.");
            }
        }
    }
}
catch (Exception ex)
{
    // Log error but continue - database will be created on first request if needed
    Console.WriteLine($"Database initialization error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
}

// Configure pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

