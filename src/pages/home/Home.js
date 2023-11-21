import React, { useState, useEffect } from "react";
import "./Home.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const [showModalWelcome, setShowModalWelcome] = useState(false);

    const handleSignInClick = () => {
        navigate("/signin");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    const closeWelcomeModal = () => {
        setShowModalWelcome(false);
    }

    useEffect(() => {
        const isFirstRender = !sessionStorage.getItem("hasVisited");
        if (isFirstRender) {
            setShowModalWelcome(true);
            sessionStorage.setItem("hasVisited", "true");
        }
    }, []);

    return (

        <div className="inner-container">
          <section className="logo-container--logo-container-home">
            <img className="logo-large--logo-large-home" src={logo} alt="Logo Cat as a Service, cat with glasses and laptop"/>
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
          {showModalWelcome && (
              <div className="welcome-modal">
                  <div className="welcome-modal-content">
                    <h2>Welkom!</h2>
                    <p>De CaaS webapplicatie heb ik gemaakt in het kader van de leerlijn Frontend Development, aan de NOVI Hogeschool. Uiteraard ben ik erg trots op het eindresultaat!</p>
                    <p>Ik heb alleen de "voorkant" hoeven bouwen, dus het deel dat jij als gebruiker ziet. Dat brengt beperkingen met zich mee: omdat er geen echte server aan de "achterkant" aanwezig is, kunnen gegevens niet (langdurig) worden opgeslagen. Als je deze website een tijdje later opnieuw bezoekt, moet je dus eerst jezelf opnieuw registreren.</p>
                    <p>De kattenplaatjes worden opgehaald van een externe server, en een deel van de code die daarvoor nodig is, is niet in mijn beheer. Als bepaalde onderdelen op de Afbeeldingen-pagina niet (meer) werken, kan dit mogelijk komen doordat er daarin iets veranderd is.</p>
                    <p>Los daarvan is het zeker de moeite waard om de app te bekijken en uit te proberen. Ik hoop dat alle gezellige kattenplaatjes bij jou ook zorgen voor een glimlach!</p>
                    <Button className="close-welcome-modal-button"
                            type="button"
                            clickHandler={closeWelcomeModal}>
                        Sluiten
                    </Button>
                  </div>
                </div>
            )}
        </div>
    );
}

export default Home;