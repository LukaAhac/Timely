using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimelyApi.Models;

namespace TimelyApi.Data
{
       public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.TimeIntervals.Any()) return;
            
            var activities = new List<TimeInterval>
            {
                new TimeInterval
                {
                    ProjectName = "Project 1",
                    TimeStart = DateTime.Now,
                    TimeEnd = DateTime.Now.AddHours(3.5)
                },
                new TimeInterval
                {
                    ProjectName = "Project 2",
                    TimeStart = DateTime.Now.AddDays(3),
                    TimeEnd = DateTime.Now.AddDays(3.5)
                },
            };

            await context.TimeIntervals.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}