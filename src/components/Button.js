import React from "react";
import "./Button.css"

function Button({ clickHandler, type, disabled, children, className}) {
    return (
        <button
            onClick={clickHandler}
            type={type}
            className={className}
            disabled={disabled || false}
        >
            {children}
        </button>
    );
}

export default Button;