import React, { useState, useContext, useEffect, useRef } from "react";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import hamburgerMenuIcon from "../assets/hamburger-menu-icon.png";

function NavigationBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useState(false);

    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                toggleIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = (event) => {
        event.stopPropagation();
        toggleIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        toggleIsMobileMenuOpen(false);
    };

    return (
        <div>
            <nav className="nav-menu">
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/">Home
                </NavLink>
                <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signup">Registreren
                </NavLink>
                {!isAuth ? (
                    <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signin">Inloggen
                    </NavLink>
                ) : null}
                {isAuth ? (
                    <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/images">Afbeeldingen
                    </NavLink>
                ) : null}
                {isAuth ? (
                    <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/favorites">Favorieten
                    </NavLink>
                ) : null}
                {isAuth ? (
                    <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/profile">Profiel
                    </NavLink>
                ) : null}
                {isAuth ? (
                    <NavLink className="default-link" to="/" onClick={logout}>Uitloggen</NavLink>
                ) : null}
            </nav>

            <div className="hamburger-menu-icon-container">
                <img
                    className="hamburger-menu-icon"
                    src={hamburgerMenuIcon}
                    alt="hamburger menu icon"
                    onClick={toggleMobileMenu}
                />
            </div>

            {isMobileMenuOpen && (
                <nav className="nav-menu-hamburger" ref={mobileMenuRef}>
                    <NavLink className="default-link" to="/" onClick={closeMobileMenu}>
                        Home
                    </NavLink>
                    <NavLink className="default-link" to="/signup" onClick={closeMobileMenu}>
                        Registreren
                    </NavLink>
                    {!isAuth ? (
                    <NavLink className="default-link" to="/signin" onClick={closeMobileMenu}>
                        Inloggen
                    </NavLink>
                    ) : null}
                    {isAuth ? (
                        <NavLink className="default-link" to="/images" onClick={closeMobileMenu}>
                            Afbeeldingen
                        </NavLink>
                    ) : null}
                    {isAuth ? (
                        <NavLink className="default-link" to="/favorites" onClick={closeMobileMenu}>
                            Favorieten
                        </NavLink>
                        ) : null}
                    {isAuth ? (
                        <NavLink className="default-link" to="/profile" onClick={closeMobileMenu}>
                            Profiel
                        </NavLink>
                    ) : null}
                    {isAuth ? (
                        <NavLink className="default-link" to="/" onClick={() => { closeMobileMenu(); logout(); }}>
                            Uitloggen
                        </NavLink>
                    ) : null}
                </nav>
            )}
        </div>
    );
}

export default NavigationBar;