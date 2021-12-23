using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DepartmentStoreProject.Models
{
    public class Shop
    {
        public int ShopId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Type { set; get; }
        [Range(1, int.MaxValue)]
        public int Floor { get; set; }

        public int DepartmentStoreId { get; set; }
        public DepartmentStore DepartmentStore { get; set; }

        public List<ShopItem> ShopItems { get; set; } = new List<ShopItem>();
        public List<History> Histories { get; set; } = new List<History>();
    }
}
