using API.Errors;
using Core.Entities.Identity;
using Core.Interfaces;
using Infraestructure.Data;
using Infraestructure.Data.Repository;
using Infraestructure.Services;
using Infraestructure.settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;



// using Infraestructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services, IConfiguration config
        )
        {
            // Images Settings
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Conection string
            services.AddDbContext<ManagementContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<AppUser, IdentityRole>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequiredLength = 8;
            })
            // .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ManagementContext>();


            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme =
                opt.DefaultChallengeScheme =
                opt.DefaultForbidScheme =
                opt.DefaultScheme =
                opt.DefaultSignInScheme =
                opt.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = config["Token:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = config["Token:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        System.Text.Encoding.UTF8.GetBytes(config["Token:Key"])
                    )
                };
            });
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<INoteRepository, NoteRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();

            ////
            ////
            // Configure the behavior of the API by configuring 'ApiBehaviorOptions'
            services.Configure<ApiBehaviorOptions>(options =>
            { // An answer factory is established to handle the answers in case of invalid model errors
                options.InvalidModelStateResponseFactory = ActionContext =>
                {
                    var errors = ActionContext.ModelState // Validation errors that have occurred in the request are collected
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse // Which will contain the information of the validation errors of the model.
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            ///
            ////////

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "http://192.168.0.104:3000");
                });
            });

            return services;
        }
    }
}