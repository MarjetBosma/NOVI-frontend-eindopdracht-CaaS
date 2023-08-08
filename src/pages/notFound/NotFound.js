import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div>
            <h3>Oeps, deze pagina bestaat niet!</h3>
            <h3> Terug naar <Link to="/">Home</Link>.</h3>
        </div>
    )
}

export default NotFound