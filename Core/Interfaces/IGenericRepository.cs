using System.Linq.Expressions;
using Core.Entities;
using Core.Entities.Identity;
using Core.Specification;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetUserEntity(AppUser user);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);

        Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec);
        Task<T> GetEntityByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec);

        Task<int> CountAsync(ISpecification<T> spec);
        Task<int> CountByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec, int pageIndex, int pageSize);


        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}

