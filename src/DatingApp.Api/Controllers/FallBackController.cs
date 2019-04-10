using System.IO;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    public class FallBackController : Controller
    {
        public IActionResult Index()
        {
            var indexFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            return PhysicalFile(indexFile, "text/html");
        }
    }
}