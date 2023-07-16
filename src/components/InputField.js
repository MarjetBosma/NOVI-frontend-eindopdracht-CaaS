import React from 'react';
import './InputField.css'

function InputField({ label, inputType, name, value, changeHandler }) {
    return (
        <div>
            <label htmlFor={`${name}-field`}>{label}</label>
            <input
                type={inputType}
                id={`${name}-input`}
                name={name}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </div>
    );
}

export default InputField;