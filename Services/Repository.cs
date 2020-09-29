using AngularP.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AngularP.Services
{
    public class Repository<T> 
        where T: class, IEntity
    {
        protected DbSet<T> items { get; set; }
        protected MainDbContext context { get; set; }
        public Repository(MainDbContext context)
        {
            this.context = context;
            items = context.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {
            return items;
        }

        public virtual T Get(int id)
        {
            return items.Find(id);
        }

        public virtual void Add(T item)
        {
            items.Add(item);
            context.SaveChanges();
        }

        public virtual void Remove(int id)
        {
            var item = items.Find(id);
            if (item == null)
                return;
            items.Remove(item);
            context.SaveChanges();
        }

        public virtual void Update(int id, T item)
        {
            var oldItem = items.Find(id);
            if (oldItem == null)
                return;
            items.Remove(oldItem);
            item.Id = id;
            items.Add(item);
            context.SaveChanges();
        }
    }
}
