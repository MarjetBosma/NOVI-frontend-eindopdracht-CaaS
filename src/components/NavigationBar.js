import React, { useState, useContext, useEffect, useRef } from "react";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import hamburgerMenuIcon from "../assets/hamburger-menu-icon.png";

function NavigationBar() {
    const { logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = (event) => {
        event.stopPropagation();
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div>
            <nav className={isMobileMenuOpen ? "nav-menu-hamburger" : "nav-menu"}>
                {/* ... your NavLink elements */}
            </nav>

            <div className="hamburger-menu-icon-container">
                <img
                    className="hamburger-menu-icon"
                    src={hamburgerMenuIcon}
                    alt="hamburger menu icon"
                    onClick={toggleMobileMenu}
                />
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <nav className="nav-menu-hamburger" ref={mobileMenuRef}>
                    <NavLink className="default-link" to="/" onClick={closeMobileMenu}>
                        Home
                    </NavLink>
                    <NavLink className="default-link" to="/signup" onClick={closeMobileMenu}>
                        Registreren
                    </NavLink>
                    <NavLink className="default-link" to="/signin" onClick={closeMobileMenu}>
                        Inloggen
                    </NavLink>
                    <NavLink className="default-link" to="/images" onClick={closeMobileMenu}>
                        Afbeeldingen
                    </NavLink>
                    <NavLink className="default-link" to="/profile" onClick={closeMobileMenu}>
                        Profiel
                    </NavLink>
                    <NavLink className="default-link" to="/" onClick={() => { closeMobileMenu(); logout(); }}>
                        Uitloggen
                    </NavLink>
                </nav>
            )}
        </div>
    );
}

export default NavigationBar;