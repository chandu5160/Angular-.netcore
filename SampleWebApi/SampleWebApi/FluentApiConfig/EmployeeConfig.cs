using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SampleWebApi.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
               .Property(e => e.Email)
               .IsRequired();
            entityBuilder
               .Property(e => e.Password)
               .IsRequired();
        }
    }
}
