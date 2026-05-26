using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Biblioteca.Infrastructure.Data;

public class BibliotecaDbContextFactory : IDesignTimeDbContextFactory<BibliotecaDbContext>
{
    public BibliotecaDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<BibliotecaDbContext>();

        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=BibliotecaDB;Username=postgres;Password=123"
        );

        return new BibliotecaDbContext(optionsBuilder.Options);
    }
}