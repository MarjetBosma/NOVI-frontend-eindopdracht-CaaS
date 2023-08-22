import React from "react";
import "./InputField.css"

function InputField({ inputLabel, inputType, inputName, inputValue, onChange, validationRules, placeholder, register, errors}) {

    return (
        <div className="input-container">
          <label htmlFor={`${inputName}-field`}>
            {inputLabel}
          </label>
          <input
            type={inputType}
            value={inputValue}
            placeholder={placeholder}
            id={`${inputName}-input`}
            onChange={onChange}
            {...register(inputName, validationRules)}
          />
          {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
        </div>
    );
}

export default InputField;