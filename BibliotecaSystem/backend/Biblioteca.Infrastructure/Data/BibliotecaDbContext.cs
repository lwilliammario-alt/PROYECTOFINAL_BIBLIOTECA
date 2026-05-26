using Biblioteca.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca.Infrastructure.Data;

public class BibliotecaDbContext : DbContext
{
    public BibliotecaDbContext(
        DbContextOptions<BibliotecaDbContext> options
    ) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }

    public DbSet<Libro> Libros { get; set; }
}