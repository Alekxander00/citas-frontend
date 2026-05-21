import React from 'react';

const InputNumerico = ({ label, name, value, onChange, required, minLength, maxLength, placeholder }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    // Solo permite números
    if (/^\d*$/.test(input)) {
      onChange(e);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>
      <input
        type="tel"
        inputmode="numeric"
        pattern="[0-9]*"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};

export default InputNumerico;