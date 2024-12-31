using System.Linq.Expressions;

namespace Core.Specification
{
    /// <summary>
    /// Base class for specifications that define criteria and query customization for entities of type T.
    /// </summary>
    /// <typeparam name="T">The type of the entity.</typeparam>
    public class BaseSpecification<T> : ISpecification<T>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BaseSpecification{T}"/> class with default settings.
        /// </summary>
        public BaseSpecification()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseSpecification{T}"/> class with a specific search criteria.
        /// </summary>
        /// <param name="criteria">The expression representing the search criteria.</param>
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        /// <summary>
        /// Gets the expression that defines the search criteria.
        /// </summary>
        public Expression<Func<T, bool>> Criteria { get; }

        /// <summary>
        /// Gets the list of expressions representing the navigation properties to include in the query.
        /// </summary>
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        /// <summary>
        /// Gets the expression that defines the ordering criteria for the query.
        /// </summary>
        public Expression<Func<T, object>> OrderBy { get; private set; }

        /// <summary>
        /// Gets the expression that defines the ordering criteria in descending order for the query.
        /// </summary>
        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        /// <summary>
        /// Gets the number of records to take in the query.
        /// </summary>
        public int Take { get; private set; }

        /// <summary>
        /// Gets the number of records to skip in the query.
        /// </summary>
        public int Skip { get; private set; }

        /// <summary>
        /// Gets a value indicating whether paging is enabled for the query.
        /// </summary>
        public bool IsPagingEnabled { get; private set; }

        public List<Func<IQueryable<T>, IQueryable<T>>> ThenIncludes { get; } = new List<Func<IQueryable<T>, IQueryable<T>>>();

        /// <summary>
        /// Adds a new include expression to the list of navigation properties to include in the query.
        /// </summary>
        /// <param name="includeExpression">The expression representing the navigation property to include.</param>
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void AddThenInclude(Func<IQueryable<T>, IQueryable<T>> thenIncludeExpression)
        {
            ThenIncludes.Add(thenIncludeExpression);
        }

        /// <summary>
        /// Sets the ordering criteria for the query.
        /// </summary>
        /// <param name="orderByExpression">The expression representing the ordering criteria.</param>
        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

        /// <summary>
        /// Sets the ordering criteria in descending order for the query.
        /// </summary>
        /// <param name="orderByDescExpression">The expression representing the ordering criteria in descending order.</param>
        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
        {
            OrderByDescending = orderByDescExpression;
        }

        /// <summary>
        /// Applies pagination to the query.
        /// </summary>
        /// <param name="skip">The number of records to skip.</param>
        /// <param name="take">The number of records to take.</param>
        /// <exception cref="ArgumentException">Thrown when skip is negative or take is less than or equal to zero.</exception>
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
