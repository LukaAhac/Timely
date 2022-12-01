using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelyApi.Models
{
    public class TimeInterval
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; }
        public DateTime TimeStart { get; set; } 
        public DateTime TimeEnd { get; set; }

    }
}