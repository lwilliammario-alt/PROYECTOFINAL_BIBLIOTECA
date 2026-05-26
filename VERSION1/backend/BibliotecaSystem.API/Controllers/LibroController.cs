using BibliotecaSystem.Application.DTOs;
using BibliotecaSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibroController : ControllerBase
{
    private readonly ILibroService _libroService;

    public LibroController(ILibroService libroService)
    {
        _libroService = libroService;
    }

    [HttpPost]
    public IActionResult Registrar([FromBody] CreateLibroDto dto)
    {
        _libroService.RegistrarLibro(dto);
        return Ok(new { mensaje = "Libro registrado correctamente." });
    }
}
