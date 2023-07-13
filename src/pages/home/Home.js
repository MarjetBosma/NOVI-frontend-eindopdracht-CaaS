import React from 'react';
import './Home.css'
import logo from "../../assets/caas-logo-no-text.jpg";

function Home() {
    return (
        <div className="inner-container">
          <div className="image-container">
            <img id="logo-large" src={logo} alt="logo"/>
          </div>
          <div className="content-container">
              <h1>Welkom</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore enim hic perferendis repellat. Ex perspiciatis unde vitae. Aliquam aliquid aperiam cum cumque doloremque modi necessitatibus nobis recusandae rem repudiandae.</p>
              <button type="button">Log in</button>
              <button type="button">Account aanmaken</button>
              {/*Buttons nog als component*/}
          </div>

        </div>
    );
}

export default Home;