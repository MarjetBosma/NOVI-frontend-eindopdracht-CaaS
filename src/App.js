import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import logo from "./assets/caas-logo-no-text.jpg"
import hamburgerMenuIcon from "./assets/hamburger-menu-icon.png"
import "./App.css";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Images from "./pages/images/Images";
import Profile from "./pages/profile/Profile";
import Favorites from "./pages/favorites/Favorites";
import HamburgerMenu from "./components/HamburgerMenu";

function App() {
  //const { isAuth } = useContext(AuthContext);

  return (
    <div className="outer-container">
      <header>
        <span className="logo-text-container-header">
            <span className="logo-container-header">
              <img className="logo-small" src={logo} alt="logo"/>
            </span>
            <span className="text-container-header">
                <h3 className="caas-small">CaaS</h3>
                <p className="cat-as-a-service-small">Cat as a Service</p>
            </span>
        </span>
        <span className="navbar-container">
          <NavigationBar />
        </span>
        <span className="hamburger-menu-container">
          <HamburgerMenu />
        </span>
      </header>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/images" element={<Images />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>
      </div>
      <footer>
        <p className="footer-text">
            © Marjet Bosma, Eindopdracht Frontend, NOVI Hogeschool
        </p>
      </footer>
    </div>
  );
}

export default App;
