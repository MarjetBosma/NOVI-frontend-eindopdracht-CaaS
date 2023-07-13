import React from 'react';
import './InputField.css'

function InputField({ label, type, id, name, value, handleInputChange}) { // Ik begrijp niet waarom id grijs blijft...?
    return (
        <div>
            <label htmlFor={`${name}-field`}>{label}</label>
            <input
                type={type}
                id={`${name}-input`}
                name={name}
                value={value}
                // onChange={(e) => changeHandler(e)} // Zo deed ik het bij de basisopdrachten
                onChange={handleInputChange} // Deze schrijfwijze werd op EdHub gebruikt bij de beschrijving van hoe je één onChange handler voor meerdere events gebruikt.
            />
        </div>
    );
}

export default InputField;