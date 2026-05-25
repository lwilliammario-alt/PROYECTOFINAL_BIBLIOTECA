/**
 * InputField — Componente reutilizable para campos de formulario.
 *
 * Aplica el principio de reutilización: un único componente
 * gestiona la estructura label + input en todo el sistema.
 *
 * Props:
 *   label       {string}  Texto de la etiqueta visible.
 *   name        {string}  Nombre del campo (id + name del input).
 *   value       {string}  Valor controlado del input.
 *   onChange    {Function} Manejador del evento change.
 *   placeholder {string}  Texto de ayuda dentro del input.
 *   type        {string}  Tipo de input (default: "text").
 *   required    {boolean} Si el campo es obligatorio (default: false).
 *   disabled    {boolean} Si el campo está deshabilitado (default: false).
 *   hint        {string}  Texto de ayuda debajo del input (opcional).
 */
export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  hint
}) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="form-required" aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="form-input"
      />
      {hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}
