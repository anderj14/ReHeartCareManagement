using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        // Middleware method to handle exceptions globally
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Process the next middleware
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log the error
                _logger.LogError(ex, ex.Message);

                // Set the response content type and status code
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                // Create ApiException instance with detailed information in development environment
                var response = _env.IsDevelopment()
                    ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException((int)HttpStatusCode.InternalServerError);

                // Configure JSON serializer options
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                // Serialize the ApiException instance to JSON
                var json = JsonSerializer.Serialize(response, options);

                // Write the JSON response
                await context.Response.WriteAsync(json);
            }
        }
    }
}
