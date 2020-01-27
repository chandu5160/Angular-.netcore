using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleWebApi.Models;

namespace SampleWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeDetailsController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EmployeeDetailsController(EmployeeContext context)
        {
            this._context = context;
        }

        // GET: api/EmployeeDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDetails>>> GetEmployeeDetails()
        {
            return await this._context.EmployeeDetails.ToListAsync();
        }

        // GET: api/EmployeeDetails/5
        [HttpGet("{id}")]
        public IActionResult GetEmployeeDetails(int id)
        {
            var employeeDetails = this._context.EmployeeDetails.SingleOrDefault(e => e.EmpId == id);

            if (employeeDetails == null)
            {
                return this.Ok("data not found");
            }

            return this.Ok(employeeDetails);
        }

        // PUT: api/EmployeeDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDetails(int id, EmployeeDetails employeeDetails)
        {
            if (id != employeeDetails.Id)
            {
                return this.BadRequest();
            }

            this._context.Entry(employeeDetails).State = EntityState.Modified;

            try
            {
                await this._context.SaveChangesAsync();
                return this.Ok(employeeDetails);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.EmployeeDetailsExists(id))
                {
                    return this.NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/EmployeeDetails
        [HttpPost]
        public async Task<ActionResult<EmployeeDetails>> PostEmployeeDetails(EmployeeDetails employeeDetails)
        {
            this._context.EmployeeDetails.Add(employeeDetails);
            await this._context.SaveChangesAsync();

            return this.Ok(employeeDetails);
        }

        // DELETE: api/EmployeeDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeDetails>> DeleteEmployeeDetails(int id)
        {
            var employeeDetails = await this._context.EmployeeDetails.FindAsync(id);
            if (employeeDetails == null)
            {
                return this.NotFound();
            }

            this._context.EmployeeDetails.Remove(employeeDetails);
            await this._context.SaveChangesAsync();

            return employeeDetails;
        }

        private bool EmployeeDetailsExists(int id)
        {
            return this._context.EmployeeDetails.Any(e => e.Id == id);
        }
    }
}
