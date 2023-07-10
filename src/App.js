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
              <img src={logo} alt="logo"/>
              </span>
            <span className="logo-text-container">
                <h3 id="caas-logo-text">CaaS</h3>
                <p>Cat as a Service</p>
            </span>
        </span>
        <NavBar />
      <span className="content">
        {/*<Routes>*/}
        {/*  <Route exact path="/" element={<Home />}/>*/}
        {/*  <Route path="/signup" element={<SignUp />}/>*/}
        {/*  <Route path="/signin" element={ <SignIn />} />*/}
        {/*  <Route path="/profile" element={ isAuth ? <Profile /> : <Navigate to="/" />}/>*/}
        {/*  <Route path="/images" element={ isAuth ? <Images /> : <Navigate to="/" />}/>*/}
        {/*</Routes>*/}
      </span>
      </header>
    </div>
  );
}

export default App;
