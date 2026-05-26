using System.ComponentModel.DataAnnotations;

namespace BibliotecaSystem.Application.DTOs;

public class CreateLibroDto
{
    [Required(ErrorMessage = "El título es obligatorio.")]
    [MinLength(3, ErrorMessage = "El título debe tener al menos 3 caracteres.")]
    [MaxLength(150, ErrorMessage = "El título no puede superar los 150 caracteres.")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "El autor es obligatorio.")]
    [MinLength(5, ErrorMessage = "El autor debe tener al menos 5 caracteres.")]
    [MaxLength(100, ErrorMessage = "El autor no puede superar los 100 caracteres.")]
    public string Autor { get; set; } = string.Empty;

    [Required(ErrorMessage = "El ISBN es obligatorio.")]
    [MinLength(10, ErrorMessage = "El ISBN debe tener al menos 10 caracteres.")]
    [MaxLength(13, ErrorMessage = "El ISBN no puede superar los 13 caracteres.")]
    public string ISBN { get; set; } = string.Empty;

    [Required(ErrorMessage = "El año de publicación es obligatorio.")]
    [Range(1450, 2100, ErrorMessage = "El año de publicación debe estar entre 1450 y 2100.")]
    public int AnioPublicacion { get; set; }
}
