using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DepartmentStoreProject.Models
{
    public class DepartmentStore
    {
        public int DepartmentStoreId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Required]
        [StringLength(60, MinimumLength = 2)]
        public string Address { set; get; }
        
        public int UserId { get; set; }
        public User User { get; set; }

        public List<Shop> Shops { get; set; } = new List<Shop>();
    }
}
