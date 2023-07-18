import React from "react";
import "./Images.css"
import { Link } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";

function Images() {
    return (
        <div className="inner-container">
            <section className="image-request-container">
                <div className="button-container">
                    <div className="inner-button-container">
                      <Button></Button>
                      <Button></Button>
                      <Button></Button>
                    </div>
                    <div className="inner-button-container">
                      <Button></Button>
                      <Button></Button>
                      <Button></Button>
                    </div>
                </div>
                <p>Eerder opgeslagen afbeeldingen bekijken? Ga naar je <Link to="/favorites">favorieten</Link>!</p>
            </section>
            <section className="title-logo-container">
                <h2>Vraag hier een kat op</h2>
                <p>Een wereld aan kattenplaatjes is slechts een muisklik van je verwijderd... Welke katten maken jou blij vandaag? </p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>

            </section>
        </div>
    );
}

export default Images;