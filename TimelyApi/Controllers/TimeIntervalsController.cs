using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Application.Core;
using TimelyApi.Application.TimeIntervals;
using TimelyApi.Models;

namespace TimelyApi.Controllers
{
    public class TimeIntervalsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult> GetTimeIntervals([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await _mediator.Send(new GetAll.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTimeInterval(Guid id)
        {
            return HandleResult(await _mediator.Send(new GetSpecific.Query{id = id}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTimeInterval(Guid id, TimeInterval timeInterval)
        {
            return HandleResult(await _mediator.Send(new Update.Command{id = id, timeInterval = timeInterval}));
        }

        [HttpPost]
        public async Task<ActionResult> CreateTimeInterval(TimeInterval timeInterval)
        {
             return HandleResult(await _mediator.Send(new Create.Command{timeInterval = timeInterval}));
        }

         [HttpDelete("{id}")]
        public async Task<ActionResult> DelteTimeInterval(Guid id)
        {
             return HandleResult(await _mediator.Send(new Delete.Command{id = id}));
        }
    }
}