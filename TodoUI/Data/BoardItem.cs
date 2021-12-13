namespace TodoUI.Data;

public class BoardItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Ip { get; set; }
    public string? Comment { get; set; }
    public DateTimeOffset Date { get; set; }
    public bool IsChange { get; set; }
}