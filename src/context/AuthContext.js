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

    // updaten van userdata in de state:
    const setUser = (newUserData) => {
        toggleIsAuth((prevAuth) => ({
            ...prevAuth,
            user: newUserData,
            status: "done",
        }));
    };

    // checken van authenticatie status bij mounting:
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


    // Deze toegevoegd, om user data op te slaan in de local storage bij wijzigingen hierin:
    useEffect(() => {
        if (isAuth.isAuth && isAuth.user) {
            localStorage.setItem("userData", JSON.stringify(isAuth.user));
        }
    }, [isAuth.user]);


    // Deze toegevoegd, om user data op te halen uit de local storage bij mounting:
    useEffect(() => {
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
            const parsedUserData = JSON.parse(savedUserData);
            setUser(parsedUserData); // Use the setUser function to update state
        }
        toggleIsAuth((prevAuth) => ({
            ...prevAuth,
            status: "done",
        }));
    }, []);

    function login(accessToken) {

        localStorage.setItem("token", accessToken);
        const decodedToken = jwt_decode(accessToken)

        fetchUserData(accessToken, "/images");
        navigate("/images");
        console.log("Gebruiker is ingelogd");
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
        console.log("Gebruiker is uitgelogd");
    }

    // Oude versie:
    // function logout() {
    //     localStorage.removeItem("favorites");
    //
    //     toggleIsAuth({
    //         ...isAuth,
    //         isAuth: false,
    //         user: null,
    //         status: "done",
    //     })
    //     navigate("/");
    //     console.log("Gebruiker is uitgelogd");
    // }

    async function fetchUserData(token, redirectUrl) {
        try {
            const response = await axios.get( `https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            } );
            console.log(response.data);

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

            // Oude versie:
            // toggleIsAuth( {
            //     ...isAuth,
            //     isAuth: true,
            //     user: {
            //         username: response.data.username,
            //         email: response.data.email,
            //         id: response.data.id,
            //     },
            //     status: "done",
            // } );

            // Nieuw toegevoegd:
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

    // loggen van huidige authenticatie status
    useEffect( () => {
        console.log(isAuth);
    }, [isAuth])


    // setUser toegevoegd t.o.v. oude versie
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