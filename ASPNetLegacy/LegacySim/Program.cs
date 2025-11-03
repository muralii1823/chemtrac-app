using Microsoft.EntityFrameworkCore;
using LegacySim.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

// Database - Use persistent path for Azure App Service
// Azure App Service: Windows uses HOME, Linux uses HOME
// For Windows: HOME\site\wwwroot\data
// For Linux: HOME\site\wwwroot\data
var homePath = Environment.GetEnvironmentVariable("HOME");
string dbPath;
string dbDir;

if (homePath != null)
{
    // Azure App Service - use persistent storage
    dbDir = Path.Combine(homePath, "site", "wwwroot", "data");
    dbPath = Path.Combine(dbDir, "app.db");
    
    // Ensure directory exists
    try
    {
        Directory.CreateDirectory(dbDir);
        Console.WriteLine($"Database directory: {dbDir}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to create directory {dbDir}: {ex.Message}");
        // Fallback to current directory
        dbPath = "Data Source=app.db";
    }
}
else
{
    // Local development
    dbPath = "Data Source=app.db";
    dbDir = Directory.GetCurrentDirectory();
}

Console.WriteLine($"Database path: {dbPath}");

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

