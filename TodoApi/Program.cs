using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var provider = builder.Configuration.GetValue("Provider", "MySQL");

builder.Services.AddDbContext<TodoContext>(opt => _ = provider switch
{
    "InMemory" => opt.UseInMemoryDatabase
    (
        "InMemory"
    ),

    "MySQL" => opt.UseMySql
    (
        builder.Configuration.GetConnectionString("MySQL"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQL"))
    ),

    "PostgreSQL" => opt.UseNpgsql
    (
        builder.Configuration.GetConnectionString("PostgreSQL")
    ),

    "SQLServer" => opt.UseSqlServer
    (
        builder.Configuration.GetConnectionString("SQLServer")
    ),

    "SQLite" => opt.UseSqlite
    (
        builder.Configuration.GetConnectionString("SQLite")
    ),

    _ => throw new Exception($"Unsupported provider: {provider}")
});

//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new() { Title = "TodoApi", Version = "v1" });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    //app.UseSwagger();
    //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TodoApi v1"));
}

//For Nginx Reverse proxy
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();