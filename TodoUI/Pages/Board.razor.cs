using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace TodoUI.Pages;
public class BoardBase : ComponentBase
{
    public string? IPAddress { get; set; } = null;

    [Inject]
    IJSRuntime? JSRuntime { get; set; }
    public TimeSpan? timeSpan { get; set; } = null;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var offsetModule = await JSRuntime!.InvokeAsync<IJSObjectReference>("import", "./clientTimezoneOffset.js");
            var Offset = await offsetModule.InvokeAsync<int>("clientTimezoneOffset");

            timeSpan = TimeSpan.FromMinutes(-Offset);

            var clientIPModule = await JSRuntime!.InvokeAsync<IJSObjectReference>("import", "./clientIPAddr.js");
            IPAddress = await clientIPModule.InvokeAsync<string>("clientIPAddr");

            StateHasChanged();
        }
    }
}