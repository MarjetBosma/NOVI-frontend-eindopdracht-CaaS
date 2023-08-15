import React from "react";
import "./InputField.css"

function InputField({ inputLabel, inputType, inputName, inputValue, onInput, validationRules, register, errors }) {

    return (
        <div className="input-container">
          <label htmlFor={`${inputName}-field`}>
            {inputLabel}
          </label>
          <input
            type={inputType}
            value={inputValue}
            onInput={onInput}
            id={`${inputName}-input`}
            {...register(inputName, validationRules)}
          />
          {errors[inputName] && <p className="error-message">{errors[inputName].message}</p>}
        </div>
    );
}

export default InputField;