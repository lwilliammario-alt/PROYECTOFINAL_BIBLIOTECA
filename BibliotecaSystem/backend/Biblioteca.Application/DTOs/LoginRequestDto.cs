namespace Biblioteca.Application.DTOs;

public class LoginRequestDto
{
    public string Codigo { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}