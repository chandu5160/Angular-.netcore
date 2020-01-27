using Microsoft.EntityFrameworkCore;
using SampleWebApi.FluentApiConfig;

namespace SampleWebApi.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
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
