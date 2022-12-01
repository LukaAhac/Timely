using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TimelyApi.Data;

namespace TimelyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected DataContext _context => HttpContext.RequestServices.GetService<DataContext>();
    }
}