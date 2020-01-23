using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SampleWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApi.FluentApiConfig
{
    public class EmployeeDetailsConfig
    {
        public EmployeeDetailsConfig(EntityTypeBuilder<EmployeeDetails> entityBuilder)
        {
            entityBuilder.HasKey(e => e.Id);
            entityBuilder
               .Property(e => e.DOB)
               .IsRequired();
            entityBuilder
              .Property(e => e.Address)
              .IsRequired();
            entityBuilder
              .Property(e => e.City)
              .IsRequired();
            entityBuilder
              .Property(e => e.State)
              .IsRequired();
            entityBuilder
              .Property<int>(e => e.PinCode)
              .IsRequired();
            entityBuilder
              .Property(e => e.Country)
              .IsRequired();
            entityBuilder
                .HasOne(e => e.Employee)
                .WithMany()
                .HasForeignKey(e => e.EmpId);
        }
    }
}
