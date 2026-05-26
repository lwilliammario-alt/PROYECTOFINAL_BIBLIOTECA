import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

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

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "nombre",
        response.nombre
      );

      setMessage("Login correcto");

      navigate("/dashboard");

    } catch (error) {

      setMessage("Credenciales incorrectas");

    }
  };

  return (

    <main className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Biblioteca Virtual
        </h1>

        <input
          type="text"
          name="codigo"
          placeholder="Código"
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