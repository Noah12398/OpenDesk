import React from 'react';
import './Input.css';

const Input = ({ label, error, type = 'text', id, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      {type === 'textarea' ? (
        <textarea 
          id={id} 
          className={`input-field input-textarea ${error ? 'input-error' : ''}`} 
          {...props} 
        />
      ) : (
        <input 
          type={type} 
          id={id} 
          className={`input-field ${error ? 'input-error' : ''}`} 
          {...props} 
        />
      )}
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;
