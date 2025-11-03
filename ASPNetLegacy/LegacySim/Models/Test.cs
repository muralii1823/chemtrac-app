using System.ComponentModel.DataAnnotations;

namespace LegacySim.Models;

public class Test
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string Version { get; set; } = "1.0";

    public string Status { get; set; } = "Draft";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

