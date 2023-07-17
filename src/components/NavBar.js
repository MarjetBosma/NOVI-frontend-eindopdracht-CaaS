import React from "react";
import "./NavBar.css"
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="nav-menu">
            <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signup">Registreren</NavLink>
            <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signin">Inloggen</NavLink>
            <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/images">Afbeeldingen</NavLink>
            <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/profile">Profiel</NavLink>
            <NavLink className="default-link" to="/">Uitloggen</NavLink>
            {/*functie uitloggen toevoegen*/}
        </nav>
    );
}

export default NavBar;