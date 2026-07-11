export function TextField({ label, id, type = 'text', ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="label-field">{label}</label>}
      <input id={id} name={id} type={type} className="input-field" {...props} />
    </div>
  );
}

export function TextAreaField({ label, id, rows = 4, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="label-field">{label}</label>}
      <textarea id={id} name={id} rows={rows} className="input-field resize-y" {...props} />
    </div>
  );
}

export function SelectField({ label, id, options = [], placeholder, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="label-field">{label}</label>}
      <select id={id} name={id} className="input-field" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
