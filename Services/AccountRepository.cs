using AngularP.Models;
using System.Linq;

namespace AngularP.Services
{
    public class AccountRepository : Repository<Account>
    {
        public AccountRepository(MainDbContext context) : base(context)
        {
        }

        public bool Contains(string email)
        {
            return items.Any(a => a.Email == email);
        }

        public Account Get(string email, string password)
        {
            return items.FirstOrDefault(a => a.Email == email && a.Password == password);
        }
    }
}
