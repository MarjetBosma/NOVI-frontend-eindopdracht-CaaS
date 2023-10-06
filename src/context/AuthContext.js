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

    const setUser = (newUserData) => {
        toggleIsAuth((prevAuth) => ({
            ...prevAuth,
            user: newUserData,
            status: "done",
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && checkTokenValidity(token)) {
            const decoded = jwt_decode(token);
            fetchUserData(token, "/");
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    function login(accessToken) {

        localStorage.setItem("token", accessToken);
        const decodedToken = jwt_decode(accessToken)

        fetchUserData(accessToken, "/images");
        navigate("/images");
    }

    function logout() {
        localStorage.removeItem("favorites");

        toggleIsAuth((prevAuth) => ({
            ...prevAuth,
            isAuth: false,
            user: null,
            status: "done",
        }));
        navigate("/");
    }

    async function fetchUserData(token, redirectUrl) {
        try {
            const response = await axios.get( `https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            } );

            toggleIsAuth((prevAuth) => ({
                ...prevAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done",
            }));

            setUser({
                username: response.data.username,
                email: response.data.email,
                id: response.data.id,
            });

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

    useEffect( () => {
    }, [isAuth])


    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
        setUser: setUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === "done" ? (
                children
            ) : (
                <div className="loading-container">
                    <h2 className="loading-message">Laden...</h2>
                    <div className="loading-animation"></div>
                </div>
            )}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;