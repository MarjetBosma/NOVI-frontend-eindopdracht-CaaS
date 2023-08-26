import React from "react";
import "./Home.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate("/signin");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    return (
        <div className="inner-container">
          <section className="logo-container--logo-container-home">
            <img className="logo-large--logo-large-home" src={logo} alt="logo"/>
          </section>

          <section className="content-container">
            <h1>Welkom</h1>
            <p>Cat as a Service is er voor die momenten dat je wel wat harige afleiding en ontspanning kunt gebruiken, maar er geen echte kat in de buurt is. Laat je verrassen, vertederen en aan het lachen brengen door de leukste kattenplaatjes. CaaS staat geheel tot je dienst!</p>
              <Button type="button"
                      clickHandler={handleSignInClick}>
                  Inloggen
              </Button>
              <Button type="button"
                      clickHandler={handleSignUpClick}>
                  Account aanmaken
              </Button>
          </section>
        </div>
    );
}

export default Home;