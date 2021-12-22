using DepartmentStoreProject.Services.Authorization.Models;

namespace DepartmentStoreProject.Sevices.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
