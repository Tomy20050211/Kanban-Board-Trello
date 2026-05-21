import type { ControllerInputProps } from "../../types/input.interface"


export function ControllerInput({
  value,
  label,
  name,
  placeholder,
  type = "text",
  required,
  minLength,
  maxLength,
  disabled,
  error,
  as = "input",
  onChange,
}: ControllerInputProps) {

  return (
    <div className="field">
      {label ? (
        <label className="field-label" htmlFor={name}>
          {label}
        </label>
      ) : null}

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={`field-control ${error ? "is-invalid" : ""}`}
          value={value}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          onChange={e => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={`field-control ${error ? "is-invalid" : ""}`}
          value={value}
          placeholder={placeholder}
          type={type}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {error ? (
        <p id={`${name}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
