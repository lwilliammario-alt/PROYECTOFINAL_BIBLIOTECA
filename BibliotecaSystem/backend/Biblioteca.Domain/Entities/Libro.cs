namespace Biblioteca.Domain.Entities;

public class Libro
{
    public Guid Id { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Autor { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;

    public int Stock { get; set; }
}