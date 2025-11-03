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

// Auto-apply migrations
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
}
catch (Exception ex)
{
    // Log error but continue - migrations will be applied on first request if needed
    Console.WriteLine($"Migration error (may be expected on first run): {ex.Message}");
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

