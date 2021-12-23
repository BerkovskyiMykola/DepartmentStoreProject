using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DepartmentStoreProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace DepartmentStoreProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly DataContext _context;

        public ShopsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/{id}")]
        public async Task<ActionResult<IEnumerable<Shop>>> GetShops(int id)
        {
            var departmentStore = await _context.DepartmentStores
                .Include(x => x.Shops)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.DepartmentStoreId == id);

            if (departmentStore == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                departmentStore.Name,
                departmentStore.Address,
                Shops = departmentStore.Shops.Select(x => new {
                    x.ShopId,
                    x.Name,
                    x.Floor,
                    x.Type
                })
            });
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<Shop>> PostShop(Shop shop)
        {
            var departmentStore = await _context.DepartmentStores
                .Include(x => x.Shops)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.DepartmentStoreId == shop.DepartmentStoreId);

            if (departmentStore == null)
            {
                return BadRequest();
            }

            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                shop.ShopId,
                shop.Name,
                shop.Floor,
                shop.Type
            });
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShop(int id, Shop shop)
        {
            if (id != shop.ShopId)
            {
                return BadRequest();
            }

            var model = await _context.Shops
                .SingleOrDefaultAsync(x => x.ShopId == id && x.DepartmentStore.User.Email == HttpContext.User.Identity.Name);

            if (model == null)
            {
                return BadRequest();
            }

            _context.Entry(shop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopExists(id))
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
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await _context.Shops
                .SingleOrDefaultAsync(x => x.ShopId == id && x.DepartmentStore.User.Email == HttpContext.User.Identity.Name);
            if (shop == null)
            {
                return NotFound();
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopExists(int id)
        {
            return _context.Shops.Any(e => e.ShopId == id);
        }
    }
}
