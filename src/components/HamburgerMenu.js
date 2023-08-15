import React, { useState } from "react";
import hamburgerMenuIcon from "../assets/hamburger-menu-icon.png";
import { NavLink } from "react-router-dom";

function HamburgerMenu() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);


    return (
        <div className="hamburger-menu-container">
            <nav className="nav-menu-hamburger">
                <button
                    className="toggle-hamburger"
                    onClick={() => setHamburgerOpen((prev) => !prev)}
                >
                    {hamburgerOpen ? 'close' : 'open'}
                </button>
                <ul className={`nav-menu-hamburger${hamburgerOpen ? ' show-menu' : ''}`}>
                    <NavLink
                        className={({ isActive }) => isActive === true ? "active-link" : "default-link"}
                        to="/">Home
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive === true ? "active-link" : "default-link"}
                        to="/signup">Registreren
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive === true ? "active-link" : "default-link"}
                        to="/signin">Inloggen
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive === true ? "active-link" : "default-link"}
                        to="/images">Afbeeldingen
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive === true ? "active-link" : "default-link"}
                        to="/profile">Profiel
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    <NavLink
                        className="default-link" to="/">Uitloggen
                        onClick={() => setHamburgerOpen(false)}
                    </NavLink>
                    {/*functie uitloggen toevoegen*/}
                </ul>
            </nav>
            {/*<div className="hamburger-menu-icon-container">*/}
            {/*    <img className="hamburger-menu-icon"*/}
            {/*         src={hamburgerMenuIcon}*/}
            {/*         alt="hamburger menu icon"*/}
            {/*         onClick={toggleHamburger}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}

export default HamburgerMenu;