using Biblioteca.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var result = _authService.Login(
            request.Codigo,
            request.Password
        );

        var successProperty = result.GetType().GetProperty("Success");

        if (successProperty != null)
        {
            bool success = (bool)successProperty.GetValue(result)!;

            if (!success)
            {
                return Unauthorized(result);
            }
        }

        return Ok(result);
    }
}

public class LoginRequest
{
    public string Codigo { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}