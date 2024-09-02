import React from 'react';
import { FormInputProps } from 'src/interfaces';

export const FormInput: React.FC<FormInputProps> = ({ id, label, type, value, name, onChange, placeholder, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};