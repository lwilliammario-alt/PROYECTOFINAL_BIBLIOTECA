using BibliotecaSystem.Application.DTOs;

namespace BibliotecaSystem.Application.Interfaces;

public interface ILibroService
{
    void RegistrarLibro(CreateLibroDto dto);
}
