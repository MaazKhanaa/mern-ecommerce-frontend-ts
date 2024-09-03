import React from 'react';
import { ButtonProps } from 'src/interfaces';
import '../styles/common.css';

export const Button: React.FC<ButtonProps> = React.memo(({ text, onClick, type = 'button', disabled = false, className = '' }) => {
    return (
        <button className={`btn primary-btn ${className}`} type={type} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
});