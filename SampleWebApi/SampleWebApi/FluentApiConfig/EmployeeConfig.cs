using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SampleWebApi.Models;

namespace SampleWebApi.FluentApiConfig
{
    public class EmployeeConfig
    {
        public EmployeeConfig(EntityTypeBuilder<Employee> entityBuilder)
        {
            entityBuilder
                .HasKey(e => e.EmpId);
            entityBuilder
                .Property(e => e.FirstName)
                .IsRequired();
            entityBuilder
               .Property(e => e.LastName)
               .IsRequired();
            entityBuilder
               .Property(e => e.Gender)
               .IsRequired();
            entityBuilder
               .Property(e => e.Phone)
               .IsRequired()
               .HasColumnType("bigint");
            entityBuilder
                .HasIndex(e => e.Phone)
                .IsUnique();
            entityBuilder
               .Property(e => e.Email)
               .IsRequired();
            entityBuilder
                .HasIndex(e => e.Email)
                .IsUnique();
            entityBuilder
               .Property(e => e.Password)
               .IsRequired();
        }
    }
}
