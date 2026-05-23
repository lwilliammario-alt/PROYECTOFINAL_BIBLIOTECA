import { useState } from "react";

export default function RegistrarLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://localhost:5001/api/libro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor, isbn }),
    });
    if (response.ok) alert("Libro registrado correctamente.");
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Registrar Libro — BibliotecaSystem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label>Autor</label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        </div>
        <div>
          <label>ISBN</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <button type="submit">Registrar libro</button>
      </form>
    </div>
  );
}
