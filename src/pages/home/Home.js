import React from 'react';
import './Home.css'
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";

function Home() {
    return (
        <div className="inner-container">
          <div className="image-container-home">
            <img id="logo-large" src={logo} alt="logo"/>
          </div>
          <div className="content-container">
            <h1>Welkom</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore enim hic perferendis repellat. Ex perspiciatis unde vitae. Aliquam aliquid aperiam cum cumque doloremque modi necessitatibus nobis recusandae rem repudiandae.</p>
            <Button type="button" className="button-homepage">Log in</Button>
            <Button type="button" className="button-homepage">Account aanmaken</Button>
          </div>
        </div>
    );
}

export default Home;