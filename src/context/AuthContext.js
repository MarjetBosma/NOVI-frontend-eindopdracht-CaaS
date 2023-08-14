import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode"
import checkTokenValidity from "../helper/checkTokenValidity";
export const AuthContext = createContext({})

function AuthContextProvider ({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem("token");
        if (token && checkTokenValidity(token)) {
            void login(token)
            const decodedToken = jwt_decode(token);
            void fetchUserData (decodedToken.sub, token);
        } else {
            void logout()
        }
    }, []);

function login(accessToken) {

    localStorage.setItem("token", accessToken);
    const decodedToken = jwt_decode(accessToken)

    void fetchUserData(decodedToken.sub, accessToken, "/images");
    navigate("/images");
    console.log("Gebruiker is ingelogd");
}

function logout() {
    toggleIsAuth({
        ...isAuth,
        isAuth: false,
        user: null,
        status: "done",
    })
    navigate("/");
    console.log("Gebruiker is uitgelogd");
}

    async function fetchUserData(token, redirectUrl) {
        try {
            const response = await axios.get( `https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            } );

            toggleIsAuth( {
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done",
            } );

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch(e) {
            console.error(e);
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: "done",
            } );
        }
    }

const contextData = {
    isAuth: isAuth,
    login: login,
    logout: logout,
};

return (
        <AuthContext.Provider value={contextData}>
            { isAuth.status === "done" ? children : <h2 className="loading-message">Loading...</h2>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;