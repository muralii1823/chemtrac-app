using Microsoft.AspNetCore.Mvc;
using LegacySim.Models;

namespace LegacySim.Controllers;

public class TestsController : Controller
{
    // Hardcoded test data for demo
    private static List<Test> GetHardcodedTests()
    {
        return new List<Test>
        {
            new Test
            {
                Id = 1,
                Name = "Sulphuric acid",
                Description = "Chemical analysis test for H2SO4 concentration",
                Version = "1.0",
                Status = "Active",
                CreatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new Test
            {
                Id = 2,
                Name = "chem 1",
                Description = "Research & Development test for new compound",
                Version = "1.0",
                Status = "Draft",
                CreatedAt = DateTime.UtcNow.AddDays(-3)
            },
            new Test
            {
                Id = 3,
                Name = "Hydrochloric Acid Test",
                Description = "Standard purity test for HCl",
                Version = "2.1",
                Status = "Completed",
                CreatedAt = DateTime.UtcNow.AddDays(-10)
            },
            new Test
            {
                Id = 4,
                Name = "Sodium Hydroxide Analysis",
                Description = "Concentration and pH level testing",
                Version = "1.5",
                Status = "Active",
                CreatedAt = DateTime.UtcNow.AddDays(-7)
            }
        };
    }

    // GET: Tests
    public IActionResult Index()
    {
        var tests = GetHardcodedTests()
            .OrderByDescending(t => t.CreatedAt)
            .ToList();
        return View(tests);
    }

    // GET: Tests/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Tests/Create (just redirects - no saving)
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create([Bind("Name,Description,Version,Status")] Test test)
    {
        if (ModelState.IsValid)
        {
            // In a real app, this would save to database
            // For demo, just redirect to show the form works
            return RedirectToAction(nameof(Index));
        }
        return View(test);
    }
}

