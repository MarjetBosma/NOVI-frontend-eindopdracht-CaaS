import React, { useState } from "react";
import "./SignIn.css"
import { Link } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import emailIcon from "../../assets/email-icon.png";
import passwordIcon from "../../assets/password-icon.png";
import visibilityIcon from "../../assets/visibility-icon.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="inner-container">
            <section className="signin-container">
              <form className="signin-form">
                <InputField
                    name="email"
                    label="E-mailadres"
                    inputType="text"
                    value={email}
                    changeHandler={setEmail}
                >
                    <img className="email-icon" src={emailIcon} alt="email icon"/>
                </InputField>
                <InputField
                    name="password"
                    label="Wachtwoord"
                    inputType="text"
                    value={password}
                    changeHandler={setPassword}
                >
                </InputField>
                <Button
                    type="submit"
                    className="button">
                    Log in
                </Button>
              </form>
              <p>Nog geen account? Registreer je <Link to="/signup">hier</Link>.</p>
            </section>

            <section className="title-logo-container">
                <h2>Log in op je account</h2>
                <p>Log snel in voor je dagelijkse dosis kattenliefde!</p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>
            </section>
        </div>
    );
}

export default SignIn;