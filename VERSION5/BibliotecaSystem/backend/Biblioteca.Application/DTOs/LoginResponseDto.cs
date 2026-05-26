namespace Biblioteca.Application.DTOs;

public class LoginResponseDto
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public string Nombre { get; set; } = string.Empty;

    public string Rol { get; set; } = string.Empty;
}