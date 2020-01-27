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
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EmployeesController(EmployeeContext context)
        {
            this._context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await this._context.Employees.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await this._context.Employees.FindAsync(id);

            if (employee == null)
            {
                return this.NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmpId)
            {
                return this.BadRequest();
            }

            this._context.Entry(employee).State = EntityState.Modified;

            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!this.EmployeeExists(id))
                {
                    return this.NotFound();
                }
                else
                {
                    throw;
                }
            }

            return this.NoContent();
        }

        [HttpPost("login")]
        public IActionResult GetEmployeeDataForLogin(Employee employee)
        {
            var user = this._context.Employees.SingleOrDefault(e => e.Email == employee.Email && e.Password == employee.Password);
            if (user != null)
            {
                    return this.Ok(user);
            }

            return this.Ok("Error");
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            this._context.Employees.Add(employee);
            await this._context.SaveChangesAsync();

            return this.Ok(employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await this._context.Employees.FindAsync(id);
            if (employee == null)
            {
                return this.NotFound();
            }

            this._context.Employees.Remove(employee);
            await this._context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return this._context.Employees.Any(e => e.EmpId == id);
        }
    }
}
