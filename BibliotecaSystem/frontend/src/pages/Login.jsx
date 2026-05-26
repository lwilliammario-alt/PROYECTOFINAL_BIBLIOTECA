import { useState } from "react";
import { login } from "../services/authService";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    codigo: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      console.log(response);

      if (response.success) {
        setMessage("Login exitoso ✔");

        localStorage.setItem("token", response.token);
        localStorage.setItem("rol", response.rol);
        localStorage.setItem("nombre", response.nombre);
      } else {
        setMessage("Credenciales incorrectas ❌");
      }

    } catch (error) {
      console.log(error);
      setMessage("Credenciales incorrectas ❌");
    }
  };

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Biblioteca Virtual</h1>

        <input
          type="text"
          name="codigo"
          placeholder="Código de usuario"
          value={formData.codigo}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Iniciar sesión
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}