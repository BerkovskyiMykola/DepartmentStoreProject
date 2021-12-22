using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DepartmentStoreProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace DepartmentStoreProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentStoresController : ControllerBase
    {
        private readonly DataContext _context;

        public DepartmentStoresController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all")]
        public async Task<IActionResult> GetDepartmentStores()
        {
            var departmentStores = await _context.DepartmentStores.Where(x => x.User.Email == HttpContext.User.Identity.Name).ToListAsync();
            return Ok(departmentStores.Select(x => new
            {
                x.DepartmentStoreId,
                x.Name,
                x.Address
            }));
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutDepartmentStore(int id, DepartmentStore departmentStore)
        {
            if (id != departmentStore.DepartmentStoreId)
            {
                return BadRequest();
            }

            if (!await _context.DepartmentStores.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.DepartmentStoreId == id))
            {
                return BadRequest();
            }

            _context.Entry(departmentStore).State = EntityState.Modified;
            _context.Entry(departmentStore).Property(x => x.UserId).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentStoreExists(id))
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

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<DepartmentStore>> PostDepartmentStore(DepartmentStore departmentStore)
        {
            departmentStore.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            _context.DepartmentStores.Add(departmentStore);
            await _context.SaveChangesAsync();

            return Ok(new 
            {
                departmentStore.DepartmentStoreId,
                departmentStore.Name,
                departmentStore.Address
            });
        }

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteDepartmentStore(int id)
        {
            var departmentStore = await _context.DepartmentStores
                .Where(x => x.User.Email == HttpContext.User.Identity.Name)
                .SingleOrDefaultAsync(x => x.DepartmentStoreId == id);

            if (departmentStore == null)
            {
                return NotFound();
            }

            _context.DepartmentStores.Remove(departmentStore);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentStoreExists(int id)
        {
            return _context.DepartmentStores.Any(e => e.DepartmentStoreId == id);
        }
    }
}
