import React, { useContext } from "react";
import "./NavigationBar.css"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavigationBar() {

    const { logout } = useContext(AuthContext);

    return (
        <div>
          <nav className="nav-menu">
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/">Home
              </NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signup">Registreren
              </NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/signin">Inloggen
              </NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/images">Afbeeldingen
              </NavLink>
              <NavLink className={({ isActive }) => isActive === true ? "active-link" : "default-link"} to="/profile">Profiel
              </NavLink>
              <NavLink className="default-link" to="/"
                       onClick={logout}>Uitloggen
              </NavLink>
          </nav>
        </div>
    );
}

export default NavigationBar;