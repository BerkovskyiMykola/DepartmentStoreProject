using System;
using System.ComponentModel.DataAnnotations;

namespace DepartmentStoreProject.Models
{
    public class History
    {
        public int HistoryId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Range(1, int.MaxValue)]
        public int PricePaid { get; set; }
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }
        public DateTime DateTime { get; set; }

        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
