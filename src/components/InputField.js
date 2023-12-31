import React from "react";
import "./InputField.css";

function InputField({ inputLabel, inputType, inputName, inputValue, onChange, register, validationRules, accept, errors }) {

    return (
        <div className="input-container">
            <label htmlFor={`${inputName}-field`}>{inputLabel}</label>
            <input
                type={inputType}
                value={inputValue}
                accept={accept}
                id={`${inputName}-input`}
                onChange={onChange}
                {...register(inputName, validationRules)}
                className={`input-field ${errors[inputName] ? "input-error" : ""}`}
            />
            {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
        </div>
    );
}

export default InputField;