import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createLibro } from "../services/libroService";
import "./CreateLibro.css";

/**
 * CreateLibro — Página de registro de libros mejorada (Semana 05).
 *
 * Mejoras aplicadas respecto a la versión inicial:
 *  - Se agrega campo anioPublicacion (año de publicación).
 *  - La lógica de API se delega a libroService.js (separación de responsabilidades).
 *  - Los campos usan el componente reutilizable InputField.
 *  - Los mensajes usan el componente reutilizable FormMessage.
 *  - La función isFormValid() centraliza la validación básica en cliente.
 *  - Se usa trim() para evitar espacios en blanco como datos válidos.
 */
export default function CreateLibro() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    anioPublicacion: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Maneja cambios en cualquier campo del formulario de forma genérica
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validación básica en el cliente.
   * Verifica que todos los campos tengan contenido real (sin solo espacios).
   */
  const isFormValid = () => {
    return (
      formData.titulo.trim().length > 0 &&
      formData.autor.trim().length > 0 &&
      formData.isbn.trim().length > 0 &&
      formData.anioPublicacion.trim().length > 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setMessageType("error");
      setMessage("Debe completar el título, autor, ISBN y año de publicación.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      setMessageType("");

      const result = await createLibro({
        titulo: formData.titulo.trim(),
        autor: formData.autor.trim(),
        isbn: formData.isbn.trim(),
        anioPublicacion: parseInt(formData.anioPublicacion.trim(), 10)
      });

      setMessageType("success");
      setMessage(result.mensaje || "Libro registrado correctamente en BibliotecaSystem.");

      // Limpiar el formulario tras un registro exitoso
      setFormData({
        titulo: "",
        autor: "",
        isbn: "",
        anioPublicacion: ""
      });
    } catch (error) {
      setMessageType("error");
      setMessage("No se pudo registrar el libro. Revise la conexión con la API.");
      console.error("Error al registrar libro:", error);
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

        {/* Formulario principal */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Título del libro"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej. Cien años de soledad"
            required={true}
            disabled={isSubmitting}
            hint="Ingrese el título completo tal como aparece en la portada."
          />

          <InputField
            label="Autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            placeholder="Ej. Gabriel García Márquez"
            required={true}
            disabled={isSubmitting}
            hint="Apellidos y nombres del autor principal."
          />

          <InputField
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Ej. 978-84-450-7179-3"
            required={true}
            disabled={isSubmitting}
            hint="Identificador estándar del libro (10 o 13 dígitos)."
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
            hint="Año en que se publicó esta edición del libro."
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
