using Biblioteca.Application.Interfaces;
using Biblioteca.Domain.Entities;
using Biblioteca.Infrastructure.Data;

namespace Biblioteca.Infrastructure.Repositories;

public class LibroRepository : ILibroRepository
{
    private readonly BibliotecaDbContext _context;

    public LibroRepository(BibliotecaDbContext context)
    {
        _context = context;
    }

    public List<Libro> GetAll()
    {
        return _context.Libros.ToList();
    }

    public Libro? GetById(Guid id)
    {
        return _context.Libros
            .FirstOrDefault(l => l.Id == id);
    }

    public void Add(Libro libro)
    {
        _context.Libros.Add(libro);
        _context.SaveChanges();
    }
}