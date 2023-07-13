import React from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import logo from "../../assets/caas-logo-no-text.jpg";

function SignUp() {
    return (
        <div className="inner-container">
          <div className="sign-up-container">
            {/*component invoervelden toevoegen*/}
            <button type="button">Registreer</button>
            {/*Button nog als component*/}
            <p>Al bekend bij CaaS? Log dan <Link to="/signin">hier</Link> in.</p>
          </div>
          <div className="title-image-container">
            <h2>Maak nu een account aan</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
            <div className="image-container-signup">
              <img id="logo-large" src={logo} alt="logo"/>
            </div>
          </div>
        </div>
    );
}

export default SignUp;