using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TimelyApi.Application.Core;
using TimelyApi.Data;

namespace TimelyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected IMediator _mediator => HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null){
                return NotFound();
            }
            if (result.IsSuccess && result.Value != null){
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null){
                return NotFound();
            }
            return BadRequest(result.Error);
        }
    }
}