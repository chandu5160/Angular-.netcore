using Microsoft.EntityFrameworkCore;
using SampleWebApi.FluentApiConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApi.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<EmployeeDetails> EmployeeDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new EmployeeConfig(modelBuilder.Entity<Employee>());

            new EmployeeDetailsConfig(modelBuilder.Entity<EmployeeDetails>());
        }
    }
}
