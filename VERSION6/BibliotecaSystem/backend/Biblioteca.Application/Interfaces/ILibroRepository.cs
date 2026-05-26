using Biblioteca.Domain.Entities;

namespace Biblioteca.Application.Interfaces;

public interface ILibroRepository
{
    List<Libro> GetAll();

    Libro? GetById(Guid id);

    void Add(Libro libro);
}