using Microsoft.EntityFrameworkCore;
using LegacySim.Models;

namespace LegacySim.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Test> Tests { get; set; }
}

