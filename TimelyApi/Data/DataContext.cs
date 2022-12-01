using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TimelyApi.Models;

namespace TimelyApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options){}
        

        public DbSet<TimeInterval> TimeIntervals { get; set; } 
    }
}