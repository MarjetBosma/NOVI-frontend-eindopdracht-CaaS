import React from 'react';
import './NavBar.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import Profile from "../pages/profile/Profile";
import Images from "../pages/images/Images";

const NavBar = () => {
    return (
        <div className="nav-menu">
            {/*<Routes>*/}
            {/*    <Route exact path="/" element={<Home />}/>*/}
            {/*    <Route path="/signup" element={<SignUp />}/>*/}
            {/*    <Route path="/signin" element={ <SignIn />} />*/}
            {/*    <Route path="/profile" element={ isAuth ? <Profile /> : <Navigate to="/" />}/>*/}
            {/*    <Route path="/images" element={ isAuth ? <Images /> : <Navigate to="/" />}/>*/}
            {/*</Routes>*/}
        </div>
    );
};

export default NavBar;