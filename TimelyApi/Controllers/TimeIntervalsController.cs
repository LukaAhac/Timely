using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Data;
using TimelyApi.Models;

namespace TimelyApi.Controllers
{
    public class TimeIntervalsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult> GetTimeIntervals()
        {
            return Ok(await _context.TimeIntervals.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTimeInterval(Guid id)
        {
            return Ok(await _context.TimeIntervals.FindAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTimeInterval(Guid id, TimeInterval timeInterval)
        {
            timeInterval.Id = id;
            var currentTimeInterval = await _context.TimeIntervals.FindAsync(id);
            if(currentTimeInterval != null){
                currentTimeInterval.ProjectName = timeInterval.ProjectName;
                currentTimeInterval.TimeStart = timeInterval.TimeStart;
                currentTimeInterval.TimeEnd = timeInterval.TimeEnd;
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateTimeInterval(TimeInterval timeInterval)
        {
             _context.TimeIntervals.Add(timeInterval);
             await _context.SaveChangesAsync();

            return Ok();
        }

         [HttpDelete("{id}")]
        public async Task<ActionResult> DelteTimeInterval(Guid id)
        {
             var timeInterval = await _context.TimeIntervals.FindAsync(id);
             _context.Remove(timeInterval);
             await _context.SaveChangesAsync();

            return Ok();
        }
    }
}