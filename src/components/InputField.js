import React from "react";
import "./InputField.css"

function InputField({ inputLabel, inputType, inputName, inputValue, validationRules, register, errors }) {

    return (
        <div>
          <label htmlFor={`${inputName}-field`}>
            {inputLabel}
            <input
                type={inputType}
                name={inputName}
                value={inputValue}
                id={`${inputName}-input`}
                {...register(inputName, validationRules)}
            />
          </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </div>
    );
}

export default InputField;