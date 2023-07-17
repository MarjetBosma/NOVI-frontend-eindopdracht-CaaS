import React from "react";
import "./Images.css"
import { Link } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";

function Images() {
    return (
        <div className="inner-container-images">
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                <div className="logo-container-images">
                    <img className="logo-large-images" src={logo} alt="logo"/>
                </div>

            </section>
        </div>
    );
}

export default Images;