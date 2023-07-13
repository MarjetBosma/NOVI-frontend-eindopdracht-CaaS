import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
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
    <div className="outer-container">
      <header>
        <span className="logo-container">
            <span className="image-container">
              <img id="logo-small" src={logo} alt="logo"/>
            </span>
            <span className="logo-text-container">
                <h3 id="caas-small">CaaS</h3>
                <p id="cat-as-a-service-small">Cat as a Service</p>
            </span>
        </span>
        <span className="navbar-container">
          {/*<NavBar />*/}
        </span>
      </header>
      <div className="content">
        {/*<Routes>*/}
        {/*  <Route exact path="/" element={<Home />}/>*/}
        {/*  <Route path="/signup" element={<SignUp />}/>*/}
        {/*  <Route path="/signin" element={<SignIn />} />*/}
        {/*  <Route path="/images" element={<Images />}/>*/}
        {/*  <Route path="/profile" element={<Profile />}/>*/}
        {/*</Routes>*/}
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
