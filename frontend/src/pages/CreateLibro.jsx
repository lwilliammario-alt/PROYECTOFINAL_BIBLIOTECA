import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createLibro } from "../services/libroService";
import "./CreateLibro.css";

/**
 * CreateLibro — Página de registro de libros.
 *
 * Funcionalidades del componente:
 *  - Registro interactivo de nuevos libros con validación avanzada de datos.
 *  - Control y validación en tiempo real para todos los campos (título, autor, ISBN, año).
 *  - Centralización del estado del formulario y manejo de mensajes de error específicos.
 *  - Comunicación asíncrona optimizada con la API del backend.
 */
export default function CreateLibro() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    anioPublicacion: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Maneja cambios en cualquier campo y limpia su error específico
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error del campo que se está editando
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  /**
   * Validación avanzada en el cliente.
   * Verifica obligatoriedad, longitud mínima, longitud máxima
   * y formato específico para cada campo.
   */
  const validateForm = () => {
    const newErrors = {};

    // --- Validación del Título ---
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    } else if (formData.titulo.trim().length < 3) {
      newErrors.titulo = "El título debe tener al menos 3 caracteres.";
    } else if (formData.titulo.trim().length > 150) {
      newErrors.titulo = "El título no puede superar los 150 caracteres.";
    }

    // --- Validación del Autor ---
    if (!formData.autor.trim()) {
      newErrors.autor = "El autor es obligatorio.";
    } else if (formData.autor.trim().length < 5) {
      newErrors.autor = "El autor debe tener al menos 5 caracteres.";
    } else if (formData.autor.trim().length > 100) {
      newErrors.autor = "El autor no puede superar los 100 caracteres.";
    }

    // --- Validación del ISBN ---
    if (!formData.isbn.trim()) {
      newErrors.isbn = "El ISBN es obligatorio.";
    } else if (formData.isbn.trim().length < 10) {
      newErrors.isbn = "El ISBN debe tener al menos 10 caracteres.";
    } else if (formData.isbn.trim().length > 13) {
      newErrors.isbn = "El ISBN no puede superar los 13 caracteres.";
    }

    // --- Validación del Año de Publicación ---
    if (!formData.anioPublicacion.toString().trim()) {
      newErrors.anioPublicacion = "El año de publicación es obligatorio.";
    } else {
      const anio = parseInt(formData.anioPublicacion, 10);
      if (isNaN(anio)) {
        newErrors.anioPublicacion = "El año de publicación debe ser un número válido.";
      } else if (anio < 1450 || anio > 2100) {
        newErrors.anioPublicacion = "El año debe estar entre 1450 y 2100.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    // Ejecutar validación antes del envío
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await createLibro({
        titulo: formData.titulo.trim(),
        autor: formData.autor.trim(),
        isbn: formData.isbn.trim(),
        anioPublicacion: parseInt(formData.anioPublicacion.trim(), 10)
      });

      setMessageType("success");
      setMessage(result.mensaje || "Libro registrado correctamente en BibliotecaSystem.");

      // Limpiar el formulario y los errores tras un registro exitoso
      setFormData({
        titulo: "",
        autor: "",
        isbn: "",
        anioPublicacion: ""
      });
      setErrors({});

    } catch (error) {
      console.error("Error al registrar libro:", error);
      setMessageType("error");
      setMessage("No se pudo registrar el libro. Verifique la información ingresada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-libro-container">
      <div className="create-libro-card">

        {/* Encabezado del formulario */}
        <div className="create-libro-header">
          <h1 className="create-libro-title">Registro de Libro</h1>
          <p className="create-libro-subtitle">
            BibliotecaSystem — UPLA. Complete los datos para ingresar un nuevo
            libro al catálogo. Los campos marcados con <span className="form-required">*</span> son obligatorios.
          </p>
        </div>

        {/* Mensaje de resultado (éxito o error) */}
        <FormMessage type={messageType} message={message} />

        {/* Formulario principal con validaciones */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Título del libro"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej. Cien años de soledad"
            required={true}
            disabled={isSubmitting}
            hint="Mínimo 3 caracteres, máximo 150."
            error={errors.titulo}
          />

          <InputField
            label="Autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            placeholder="Ej. Gabriel García Márquez"
            required={true}
            disabled={isSubmitting}
            hint="Mínimo 5 caracteres, máximo 100."
            error={errors.autor}
          />

          <InputField
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Ej. 9788491050"
            required={true}
            disabled={isSubmitting}
            hint="Identificador de 10 a 13 caracteres."
            error={errors.isbn}
          />

          <InputField
            label="Año de publicación"
            name="anioPublicacion"
            value={formData.anioPublicacion}
            onChange={handleChange}
            placeholder="Ej. 1967"
            type="number"
            required={true}
            disabled={isSubmitting}
            hint="Año entre 1450 y 2100."
            error={errors.anioPublicacion}
          />

          <button
            id="btn-registrar-libro"
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" />
                <span>Registrando...</span>
              </>
            ) : (
              <span>Registrar Libro</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
