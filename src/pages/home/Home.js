import React from "react";
import "./Home.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="inner-container">
          <section className="logo-container--logo-container-home">
            <img className="logo-large--logo-large-home" src={logo} alt="logo"/>
          </section>

          <section className="content-container">
            <h1>Welkom</h1>
            <p>Cat as a Service is er voor die momenten dat je wel wat harige afleiding en ontspanning kunt gebruiken, maar er geen echte kat in de buurt is. Laat je verrassen, vertederen en aan het lachen brengen door de leukste kattenplaatjes. CaaS staat geheel tot je dienst!</p>
            <Button type="button" className="button--button-link">
                <Link to="/signin">Inloggen</Link>
            </Button>
            <Button type="button" className="button--button-link">
                <Link to="/signup">Account aanmaken</Link>
            </Button>
          </section>
        </div>
    );
}

export default Home;