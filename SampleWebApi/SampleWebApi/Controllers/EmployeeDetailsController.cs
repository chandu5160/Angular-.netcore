using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            _context = context;
        }

        // GET: api/EmployeeDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDetails>>> GetEmployeeDetails()
        {
            return await _context.EmployeeDetails.ToListAsync();
        }

        // GET: api/EmployeeDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeDetails(int id)
        {
            var employeeDetails =  _context.EmployeeDetails.SingleOrDefault(e=> e.EmpId ==id);

            if (employeeDetails == null)
            {
                return  Ok("data not found");
            }

            return Ok(employeeDetails);
        }

        // PUT: api/EmployeeDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDetails(int id, EmployeeDetails employeeDetails)
        {
            if (id != employeeDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(employeeDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(employeeDetails);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeDetails
        [HttpPost]
        public async Task<ActionResult<EmployeeDetails>> PostEmployeeDetails(EmployeeDetails employeeDetails)
        {
            _context.EmployeeDetails.Add(employeeDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeDetails", new { id = employeeDetails.Id }, employeeDetails);
        }

        // DELETE: api/EmployeeDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeDetails>> DeleteEmployeeDetails(int id)
        {
            var employeeDetails = await _context.EmployeeDetails.FindAsync(id);
            if (employeeDetails == null)
            {
                return NotFound();
            }

            _context.EmployeeDetails.Remove(employeeDetails);
            await _context.SaveChangesAsync();

            return employeeDetails;
        }

        private bool EmployeeDetailsExists(int id)
        {
            return _context.EmployeeDetails.Any(e => e.Id == id);
        }
    }
}
