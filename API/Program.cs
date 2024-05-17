using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infraestructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;


// using Infraestructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();

//////////
var app = builder.Build();



// Configure the HTTP request pipeline.

// add the custom exception handling middleware ExceptionMiddleware
app.UseMiddleware<ExceptionMiddleware>();

// Configure the error handling middleware to redirect 
// all HTTP error responses to the path /errors/{0}.
app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.userSwaggerDocumentation();


app.UseHttpsRedirection();

// Authorization cors
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();



var services = scope.ServiceProvider;
var context = services.GetRequiredService<ManagementContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    logger.LogError(ex, "An error ocurring during migration");
}

app.Run();
