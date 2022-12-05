using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TimelyApi.Application.Core;
using TimelyApi.Extensions;
using TimelyApi.Models;

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

          protected ActionResult HandlePagedResult(Result<PagedList<TimeInterval>> result)
        {
            if (result == null){
                return NotFound();
            }
            if (result.IsSuccess && result.Value != null){
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null){
                return NotFound();
            }
            return BadRequest(result.Error);
        }
    }
}