import React from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="nav-menu">
            <NavLink className="nav-object" to="/">Home</NavLink>
            <NavLink className="nav-object" to="/signup">Registreren</NavLink>
            <NavLink className="nav-object" to="/signin">Inloggen</NavLink>
            <NavLink className="nav-object" to="/images">Afbeeldingen</NavLink>
            <NavLink className="nav-object" to="/profile">Profiel</NavLink>
            <NavLink className="nav-object" to="/">Uitloggen</NavLink>
        </nav>
    );
}

export default NavBar;