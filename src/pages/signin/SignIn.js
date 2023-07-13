import React from 'react';
import './SignIn.css'
import { Link } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function SignIn() {
    return (
        <div className="inner-container">
            <div className="sign-in-container">
                <InputField></InputField>
                <InputField></InputField>
                <Button type="button">Inloggen</Button>
                <p>Nog geen account? Registreer je <Link to="/signup">hier</Link>.</p>
            </div>
            <div className="title-image-container">
                <h2>Log in op je account</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                <div className="image-container-signin">
                    <img id="logo-large" src={logo} alt="logo"/>
                </div>
            </div>
        </div>
    );
}

export default SignIn;