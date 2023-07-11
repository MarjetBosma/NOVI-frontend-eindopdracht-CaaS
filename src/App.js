import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import logo from './assets/caas-logo-no-text.jpg'
import './App.css';
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Images from "./pages/images/Images";
import Profile from "./pages/profile/Profile";

function App() {
  //const { isAuth } = useContext(AuthContext);

  return (
    <div>
      <header id="header" className="outer-content-container">
        <span className="logo-container">
            <span className="image-container">
              <img id="logo-small" src={logo} alt="logo"/>
            </span>
            <span className="logo-text-container">
                <h3 id="caas-small">CaaS</h3>
                <p id="cat-as-a-service-small">Cat as a Service</p>
            </span>
        </span>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
