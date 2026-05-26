import { useEffect, useState } from "react";

import {
  getLibros,
  addLibro
} from "../services/libroService";

export default function Dashboard() {

  const nombre = localStorage.getItem("nombre");

  const [libros, setLibros] = useState([]);

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    stock: 0
  });

  const loadLibros = async () => {

    const data = await getLibros();

    setLibros(data);
  };

  useEffect(() => {

    loadLibros();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addLibro(formData);

    await loadLibros();

    setFormData({
      titulo: "",
      autor: "",
      categoria: "",
      stock: 0
    });
  };

  return (

    <main style={{ padding: "30px" }}>

      <h1>
        Dashboard Biblioteca
      </h1>

      <p>
        Bienvenido: {nombre}
      </p>

      <hr />

      <h2>
        Agregar Libro
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Guardar Libro
        </button>

      </form>

      <hr />

      <h2>
        Lista de Libros
      </h2>

      {
        libros.map((libro) => (

          <div
            key={libro.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{libro.titulo}</h3>

            <p>
              Autor: {libro.autor}
            </p>

            <p>
              Categoría: {libro.categoria}
            </p>

            <p>
              Stock: {libro.stock}
            </p>

          </div>
        ))
      }

    </main>
  );
}