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
    public class ShopItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public ShopItemsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetShopItems(int id)
        {
            var shop = await _context.Shops
                .Include(x => x.ShopItems)
                .SingleOrDefaultAsync(x => x.DepartmentStore.User.Email == HttpContext.User.Identity.Name && x.ShopId == id);

            if (shop == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                shop.Name,
                shop.Floor,
                shop.Type,
                ShopItems = shop.ShopItems.Select(x => new {
                    x.ShopItemId,
                    x.Name,
                    x.Price,
                    x.Amount
                })
            });
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<ShopItem>> PostShopItem(ShopItem shopItem)
        {
            var shop = await _context.Shops
                .Include(x => x.ShopItems)
                .SingleOrDefaultAsync(x => x.DepartmentStore.User.Email == HttpContext.User.Identity.Name && x.ShopId == shopItem.ShopId);

            if (shop == null)
            {
                return BadRequest();
            }

            _context.ShopItems.Add(shopItem);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                shopItem.ShopItemId,
                shopItem.Name,
                shopItem.Price,
                shopItem.Amount
            });
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShopItem(int id, ShopItem model)
        {
            if (id != model.ShopItemId)
            {
                return BadRequest();
            }

            var shopItem = await _context.ShopItems
                .SingleOrDefaultAsync(x => x.Shop.DepartmentStore.User.Email == HttpContext.User.Identity.Name && x.ShopItemId == model.ShopItemId);

            _context.Entry(shopItem).State = EntityState.Modified;

            if (model == null)
            {
                return BadRequest();
            }

            shopItem.Name = model.Name;
            shopItem.Price = model.Price;
            shopItem.Amount = model.Amount;

            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShopItem(int id)
        {
            var shopItem = await _context.ShopItems
                .SingleOrDefaultAsync(x => x.ShopItemId == id && x.Shop.DepartmentStore.User.Email == HttpContext.User.Identity.Name);
            if (shopItem == null)
            {
                return NotFound();
            }

            _context.ShopItems.Remove(shopItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
