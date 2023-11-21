
using info.sarins.services.vault.Data;
using info.sarins.services.vault.Data.Services;
using Minio;
using System.Text.Json.Serialization;

namespace info.sarins.services.vault
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var config = builder.Configuration;

            builder.Services.AddMinio(o => o
                .WithEndpoint(config.GetValue<string>("minio:host"))
                .WithCredentials(config.GetValue<string>("minio:accessKey"),
                        config.GetValue<string>("minio:secretKey"))
                .WithSSL(false)
                    , ServiceLifetime.Singleton);

            builder.Services.AddCors(op =>
            {
                op.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            // Add services to the container
            builder.Services
                .AddControllers()
                .AddJsonOptions(o =>
                {
                    o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    // Do not seralize null values to save on response bytes
                    o.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                });
            builder.Services.AddDbContext<VaultDBContext>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c => { c.EnableAnnotations(); });
            builder.Services.AddTransient<ICasefileDataService, CasefileDataService>();
            builder.Services.AddTransient<IStorageRespository, StorageRespository>();


            var app = builder.Build();
            app.UseCors("CorsPolicy");

            //TODO: Get it from environment variables
            var baseUrl = PathString.FromUriComponent("/api/v1/vault");
            app.UsePathBase(baseUrl);

            // Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
            app.UseSwagger();
            app.UseSwaggerUI();
            //}


            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}