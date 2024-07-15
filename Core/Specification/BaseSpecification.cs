using System.Linq.Expressions;

namespace Core.Specification
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        // Default constructor
        public BaseSpecification()
        {
        }

        // Builder with a search criteria
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }

        public List<Expression<Func<T, object>>> Includes { get; } =
            new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> OrderBy { get; private set; }

        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        public int Take { get; private set; }

        public int Skip { get; private set; }

        public bool IsPagingEnabled { get; private set; }

        // Adds a new include expression for navigation properties
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        // Sets the ordering criteria for the query
        protected void AddOrderBy(Expression<Func<T, object>> orderByExpresison)
        {
            OrderBy = orderByExpresison;
        }

        // Sets the ordering criteria in descending order
        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpresison)
        {
            OrderByDescending = orderByDescExpresison;
        }

        // Applies pagination to the query
        protected void ApplyPaging(int skip, int take)
        {
            if (skip < 0 || take <= 0)
            {
                throw new ArgumentException("Skip and Take values must be non-negative and Take must be greater than zero.");
            }

            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}