using AngularP.Models;
using AngularP.Models.Job;
using Microsoft.EntityFrameworkCore;

namespace AngularP.Services
{
    public class MainDbContext: DbContext
    { 
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Job> Jobs { get; set; }

        public MainDbContext(DbContextOptions<MainDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
