import React from "react";
import "./Profile.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import profilePicPlaceholder from "../../assets/profile-pic-placeholder.png"
import Button from "../../components/Button";
import { Link } from "react-router-dom";
function Profile() {
    return (
        <div className="inner-container-profile">
            <section className="profile-container">
                <article className="picture-button-container">
                    <div className="picture-container">
                        <img className="profile-pic-placeholder" src={profilePicPlaceholder} alt="profile picture placeholder image"/>
                    </div>
                    <div className="button-container-profile">
                        <Button>Upload/wijzig foto</Button>
                    </div>
                </article>
                <article className="info-button-container">
                    <div className="info-container">
                        <p><strong>Gebruikersnaam: </strong></p>
                        <p>Marjet</p>
                        <p><strong>E-mailadres: </strong></p>
                        <p>marjet_bosma@hotmail.com</p>
                        <p><strong>Wachtwoord: </strong></p>
                        <p>Firsa2006</p>
                        <p><strong>Bekijk je <Link to="/favorites">favorieten</Link>.</strong></p>
                    </div>
                    <div className="button-container-profile">
                        <Button>Wijzig gegevens</Button>
                    </div>
                </article>

            </section>
            <section className="title-logo-container-profile">
                <h2>Jouw profiel</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                <div className="logo-container-profile">
                    <img className="logo-large-profile" src={logo} alt="logo"/>
                </div>
            </section>
        </div>

    );
}

export default Profile;