using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LegacySim.Data;
using LegacySim.Models;

namespace LegacySim.Controllers;

public class TestsController : Controller
{
    private readonly ApplicationDbContext _context;

    public TestsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Tests
    public async Task<IActionResult> Index()
    {
        var tests = await _context.Tests
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        return View(tests);
    }

    // GET: Tests/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Tests/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Name,Description,Version,Status")] Test test)
    {
        if (ModelState.IsValid)
        {
            test.CreatedAt = DateTime.UtcNow;
            _context.Add(test);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(test);
    }
}

