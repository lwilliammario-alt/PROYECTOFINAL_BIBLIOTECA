using Biblioteca.Application.Helpers;
using Biblioteca.Application.Interfaces;

namespace Biblioteca.Application.Services;

public class AuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly JwtHelper _jwtHelper;

    public AuthService(
        IUsuarioRepository usuarioRepository,
        JwtHelper jwtHelper)
    {
        _usuarioRepository = usuarioRepository;
        _jwtHelper = jwtHelper;
    }

    public object Login(string codigo, string password)
    {
        var usuario = _usuarioRepository.GetByCodigo(codigo);

        if (usuario == null)
        {
            return new
            {
                Success = false,
                Message = "Usuario no encontrado"
            };
        }

        bool passwordCorrecta =
            BCrypt.Net.BCrypt.Verify(
                password,
                usuario.Password
            );

        if (!passwordCorrecta)
        {
            return new
            {
                Success = false,
                Message = "Contraseña incorrecta"
            };
        }

        var token = _jwtHelper.GenerateToken(usuario);

        return new
        {
            Success = true,
            Token = token,
            Nombre = usuario.Nombre,
            Rol = usuario.Rol
        };
    }
}