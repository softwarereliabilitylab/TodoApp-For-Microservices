using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddHttpClient();

// Get URL Todo
var config = new ConfigurationBuilder()
    .AddJsonFile("./appsettings.json", optional: true)
    .AddJsonFile("./appsettings.Development.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

// DI URL
builder.Services.AddSingleton(_ =>
{
    return config.GetValue<string>("todoapi");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

//For Nginx Reverse proxy
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
