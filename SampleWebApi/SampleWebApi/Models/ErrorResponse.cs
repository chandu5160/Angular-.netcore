using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApi.Models
{
    public class ErrorResponse
    {
        public string  Status { get; set; }

        public string ErrorMessage { get; set; }
    }
}
