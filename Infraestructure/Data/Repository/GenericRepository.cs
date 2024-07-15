using System.Linq.Expressions;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ManagementContext _context;
        public GenericRepository(ManagementContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }


        public async Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec)
        {
            var query = ApplySpecification(spec);

            query = query.Where(filter);

            return await query.ToListAsync();
        }
        public async Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec, int pageIndex, int pageSize)
        {
            var query = ApplySpecification(spec).Where(filter)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);

            return await query.ToListAsync();
        }

        public async Task<T> GetEntityByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec)
        {
            var query = ApplySpecification(spec);

            query = query.Where(filter);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }
        public async Task<int> CountByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec)
        {
            var query = ApplySpecification(spec).Where(filter);
            return await query.CountAsync();
        }

        // 'Set<T>()' is used to access the DbSet for the entity type.
        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}