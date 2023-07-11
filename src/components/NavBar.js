import React from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import Profile from "../pages/profile/Profile";
import Images from "../pages/images/Images";

function NavBar() {
    return (
        <nav className="nav-menu">
            <NavLink className="nav-object" to="/">Home</NavLink>
            <NavLink className="nav-object" to="/signup">Registreren</NavLink>
            <NavLink className="nav-object" to="/signin">Inloggen</NavLink>
            <NavLink className="nav-object" to="/images">Afbeeldingen</NavLink>
            <NavLink className="nav-object" to="/profile">Profiel</NavLink>
            <NavLink className="nav-object" to="/">Uitloggen</NavLink>
            {/*Dit moet nog anders*/}
        </nav>
    );
}

export default NavBar;