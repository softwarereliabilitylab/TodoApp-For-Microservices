using Microsoft.AspNetCore.Components;

namespace TodoUI.Pages;
public class BoardBase : ComponentBase
{
    [Inject]
    IHttpContextAccessor? contextAccessor { get; set; }
    public string? IPAddress { get; set; } = null;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            IPAddress = contextAccessor?.HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4().ToString();

            if (String.IsNullOrWhiteSpace(IPAddress))
            {
                IPAddress = contextAccessor?.HttpContext?.Request.Headers["X-Forwarded-For"].ToString();
            }

            if (String.IsNullOrWhiteSpace(IPAddress))
            {
                IPAddress = "Dummy";
            }

            StateHasChanged();
        }
    }
}