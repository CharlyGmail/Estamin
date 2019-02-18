using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Estamin.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Dictionary<Int32, string> dict = new Dictionary<Int32, string>()
            {
                { 1 , "value1"},
                { 2 , "value2"}
            };
            return View(dict);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Home()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
    }
}