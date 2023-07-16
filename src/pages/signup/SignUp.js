import React, { useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import logo from "../../assets/caas-logo-no-text.jpg";
import userIcon from "../../assets/user-icon.png";
import emailIcon from "../../assets/email-icon.png";
import passwordIcon from "../../assets/password-icon.png";
import visibilityIcon from "../../assets/visibility-icon.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="inner-container">
          <section className="signup-container">
            <form className="signup-form">
              <InputField
                name="username"
                label="Gebruikersnaam"
                inputType="text"
                value={username}
                changeHandler={setUsername}
              >
                <img className="user-icon" src={userIcon} alt="user icon"/>
              </InputField>
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
                <img className="password-icon" src={passwordIcon} alt="password icon"/>
                <img className="visibility-icon" src={visibilityIcon} alt="visibility icon"/>
              </InputField>
            </form>
                <Button
                  type="submit"
                  className="button">
                  Registreer
              </Button>

            <p>Al bekend bij CaaS? Log dan <Link to="/signin">hier</Link> in.</p>
          </section>

          <section className="title-image-container">
            <h2>Maak nu een account aan</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
            <div className="image-container-signup">
              <img className="logo-large-signup" src={logo} alt="logo"/>
            </div>
          </section>
        </div>
    );
}

export default SignUp;