using AngularP.Models.Job;
using System.Linq;

namespace AngularP.Services
{
    public class JobRepository : Repository<Job>
    {
        public JobRepository(MainDbContext context) : base(context)
        {
        }
    }
}
