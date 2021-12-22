using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DepartmentStoreProject.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        public string Password { set; get; }
        [Required]
        public string Role { get; set; }

        public List<DepartmentStore> DepartmentStores { get; set; } = new List<DepartmentStore>();
    }
}
