import React, { useState } from "react";
import "./NavigationBar.css"
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import hamburgerMenuIcon from "../assets/hamburger-menu-icon.png";

function NavigationBar() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }
    return (
        <div>
          <nav className="nav-menu">
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/">Home</NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signup">Registreren</NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signin">Inloggen</NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/images">Afbeeldingen</NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/profile">Profiel</NavLink>
              <NavLink className="default-link" to="/">Uitloggen</NavLink>
              {/*functie uitloggen toevoegen*/}
          </nav>
          <div className="hamburger-menu-container">
            <div className="hamburger-menu-icon-container">
              <img className="hamburger-menu-icon"
                   src={hamburgerMenuIcon}
                   alt="hamburger menu icon"
                   onClick={toggleHamburger}
              />
            </div>
            <HamburgerMenu isOpen={hamburgerOpen}/>
          </div>
        </div>
    );
}

export default NavigationBar;