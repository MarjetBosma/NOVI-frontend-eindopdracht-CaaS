import React, { useState } from "react";
import hamburgerMenuIcon from "../assets/hamburger-menu-icon.png";
import {NavLink} from "react-router-dom";


function HamburgerMenu() {
    return (
        <div className="hamburger-menu-container">
            <nav className="nav-menu-hamburger">
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signup">Registreren</NavLink>
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signin">Inloggen</NavLink>
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/images">Afbeeldingen</NavLink>
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/profile">Profiel</NavLink>
                <NavLink className="default-link" to="/">Uitloggen</NavLink>
                {/*functie uitloggen toevoegen*/}
            </nav>
        </div>
    );
}

export default HamburgerMenu;