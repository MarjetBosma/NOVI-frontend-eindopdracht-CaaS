import React from 'react';
import './Button.css'

function Button({ clickHandler, type, disabled, children}) {
    return (
        <button
            onClick={clickHandler}
            type={type}
            disabled={disabled || false} // in principe false, disabled wanneer dit wordt aangegeven
        >
            {children}
            {/*In dit geval staat de children property voor de tekst op de button*/}
        </button>
    );
}

export default Button;