using Microsoft.AspNetCore.Mvc;

namespace cbs_loan_screen.wwwroot
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
