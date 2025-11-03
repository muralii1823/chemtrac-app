using Microsoft.AspNetCore.Mvc;

namespace LegacySim.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

