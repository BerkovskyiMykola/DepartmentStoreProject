using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DepartmentStoreProject.Services.Authorization.Settings
{
    public class JwtSettings
    {
        public const string ISSUER = "DepartmentStoreProject";
        public const string AUDIENCE = "DepartmentStoreProjectClient";
        private static readonly string KEY = RandomKey.CreateKey(30);
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
