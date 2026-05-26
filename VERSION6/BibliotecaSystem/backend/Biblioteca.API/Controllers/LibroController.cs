using Biblioteca.Application.Interfaces;
using Biblioteca.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Biblioteca.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibroController : ControllerBase
{
    private readonly ILibroRepository _libroRepository;

    public LibroController(ILibroRepository libroRepository)
    {
        _libroRepository = libroRepository;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var libros = _libroRepository.GetAll();

        return Ok(libros);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Add(Libro libro)
    {
        libro.Id = Guid.NewGuid();

        libro.Titulo = LimpiarTexto(libro.Titulo);
        libro.Autor = LimpiarTexto(libro.Autor);
        libro.Categoria = LimpiarTexto(libro.Categoria);

        _libroRepository.Add(libro);

        return Ok(new
        {
            message = "Libro agregado correctamente"
        });
    }

    private string LimpiarTexto(string texto)
    {
        return string.Join(
            " ",
            texto.Split(
                ' ',
                StringSplitOptions.RemoveEmptyEntries
            )
        ).Trim();
    }
}