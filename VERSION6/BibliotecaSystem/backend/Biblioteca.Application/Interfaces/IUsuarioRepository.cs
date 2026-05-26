using Biblioteca.Domain.Entities;

namespace Biblioteca.Application.Interfaces;

public interface IUsuarioRepository
{
    Usuario? GetByCodigo(string codigo);
}