const API_URL = "http://localhost:5240/api/libro";

/**
 * Registra un nuevo libro en el sistema.
 * @param {Object} libroData - Datos del libro a registrar.
 * @param {string} libroData.titulo - Título del libro.
 * @param {string} libroData.autor - Autor del libro.
 * @param {string} libroData.isbn - ISBN del libro.
 * @param {number} libroData.anioPublicacion - Año de publicación del libro.
 * @returns {Promise<Object>} Respuesta del servidor.
 */
export async function createLibro(libroData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(libroData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "No se pudo registrar el libro.");
  }

  return await response.json();
}
