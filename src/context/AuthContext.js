import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext({})

function AuthContextProvider ({ children }) {

    return (
        <AuthContext.Provider value={}>
            { isAuth.status === 'done' ? children : <h3 className="loading-message">Loading...</h3>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;