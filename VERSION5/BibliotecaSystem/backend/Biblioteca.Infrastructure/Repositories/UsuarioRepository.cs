using Biblioteca.Application.Helpers;
using Biblioteca.Application.Interfaces;
using Biblioteca.Domain.Entities;
using Biblioteca.Infrastructure.Data;

namespace Biblioteca.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly BibliotecaDbContext _context;

    public UsuarioRepository(BibliotecaDbContext context)
    {
        _context = context;
    }

    public Usuario? GetByCodigo(string codigo)
    {
        return _context.Usuarios
            .FirstOrDefault(u => u.Codigo == codigo);
    }

    public Usuario? Login(string codigo, string password)
    {
        var usuario = _context.Usuarios
            .FirstOrDefault(u => u.Codigo == codigo);

        if (usuario == null)
            return null;

        bool passwordCorrecto =
            PasswordHelper.VerifyPassword(
                password,
                usuario.Password
            );

        return passwordCorrecto ? usuario : null;
    }
}