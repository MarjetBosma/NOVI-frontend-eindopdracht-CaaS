import React from 'react';
import './Home.css'
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="inner-container">
          <section className="image-container-home">
            <img className="logo-large-home" src={logo} alt="logo"/>
          </section>

          <section className="content-container">
            <h1>Welkom</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore enim hic perferendis repellat. Ex perspiciatis unde vitae. Aliquam aliquid aperiam cum cumque doloremque modi necessitatibus nobis recusandae rem repudiandae.</p>
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