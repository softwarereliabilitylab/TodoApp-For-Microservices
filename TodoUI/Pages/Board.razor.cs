using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace TodoUI.Pages;
public class BoardBase : ComponentBase
{
    [Inject]
    IHttpContextAccessor? contextAccessor { get; set; }
    public string? IPAddress { get; set; } = null;

    [Inject]
    IJSRuntime? JSRuntime { get; set; }
    public TimeSpan? timeSpan;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            IPAddress = contextAccessor?.HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4().ToString();

            if (String.IsNullOrWhiteSpace(IPAddress))
            {
                IPAddress = contextAccessor?.HttpContext?.Request?.Headers["X-Forwarded-For"].FirstOrDefault()?.ToString();
            }

            if (String.IsNullOrWhiteSpace(IPAddress))
            {
                IPAddress = "Dummy";
            }

            var module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./Pages/Board.razor.js");
            var Offset = await module.InvokeAsync<int>("clientTimezoneOffset");

            timeSpan = TimeSpan.FromMinutes(-Offset);

            StateHasChanged();
        }
    }
}