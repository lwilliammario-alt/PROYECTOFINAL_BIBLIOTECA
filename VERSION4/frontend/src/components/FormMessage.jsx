/**
 * FormMessage — Componente reutilizable para mostrar mensajes de éxito o error.
 *
 * Props:
 *   type    {string}  "success" | "error" — Tipo de mensaje.
 *   message {string}  Texto del mensaje a mostrar.
 */
export default function FormMessage({ type, message }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`} role="alert">
      <span className="alert-icon">
        {type === "success" ? "✓" : "⚠"}
      </span>
      <span>{message}</span>
    </div>
  );
}
