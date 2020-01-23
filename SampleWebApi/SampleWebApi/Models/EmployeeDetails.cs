using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApi.Models
{
    public class EmployeeDetails
    {
        public int Id { get; set; }

        public string DOB { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int PinCode { get; set; }

        public string Country { get; set; }

        public int EmpId { get; set; }
        public Employee Employee { get; set; }
    }
}
