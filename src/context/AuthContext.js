import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext({})

function AuthContextProvider ({ children }) {
    const [isAuth, toggleAuth] = useState(false);
    const navigate = useNavigate();

    function login() {
        console.log('Gebruiker is ingelogd!');
        toggleAuth(true);
        navigate('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleAuth(false);
        navigate('/');
    }

    const contextData = {
        isAuth: isAuth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;