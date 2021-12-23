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
    public class HistoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public HistoriesController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User,VIP")]
        [HttpGet("all/{id}")]
        public async Task<ActionResult<IEnumerable<History>>> GetHistories(int id)
        {
            var shop = await _context.Shops
                .Include(x => x.Histories)
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
                Histories = shop.Histories.OrderByDescending(x => x.DateTime).Select(x => new {
                    x.HistoryId,
                    x.Name,
                    x.PricePaid,
                    x.Amount,
                    x.DateTime
                })
            });
        }

        [Authorize(Roles = "User,VIP")]
        [HttpPost("createRandom/{id}")]
        public async Task<IActionResult> PostHistory(int id)
        {
            var shop = await _context.Shops
                .Include(x => x.ShopItems)
                .SingleOrDefaultAsync(x => x.DepartmentStore.User.Email == HttpContext.User.Identity.Name && x.ShopId == id);

            if (shop == null)
            {
                return BadRequest();
            }

            var shopItem = shop.ShopItems.OrderBy(x => Guid.NewGuid()).FirstOrDefault();

            if (shopItem == null)
            {
                return NotFound();
            }

            var history = new History
            {
                Name = shopItem.Name,
                PricePaid = shopItem.Price,
                Amount = new Random().Next(1, shopItem.Amount),
                DateTime = DateTime.Now, 
                ShopId = id
            };

            await _context.AddAsync(history);

            if (shopItem.Amount == history.Amount)
            {
                _context.Remove(shopItem);
            }
            else
            {
                shopItem.Amount -= history.Amount;
            }

            await _context.SaveChangesAsync();

            return Ok(new 
            {
                history.HistoryId,
                history.Name,
                history.PricePaid,
                history.Amount,
                history.DateTime
            });
        }

        // POST: api/Histories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostHistory(History history)
        {
            _context.Histories.Add(history);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
