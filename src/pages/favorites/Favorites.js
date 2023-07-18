import React from "react";
import "./Favorites.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";

function Favorites() {
    return (
        <div className="inner-container">
            <section className="favorites-button-container">
                <div className="favorites-container">
                  <article className="thumbnail tn-1"></article>
                  <article className="thumbnail tn-2"></article>
                  <article className="thumbnail tn-3"></article>
                  <article className="thumbnail tn-4"></article>
                  <article className="thumbnail tn-5"></article>
                  <article className="thumbnail tn-6"></article>
                  <article className="thumbnail tn-7"></article>
                  <article className="thumbnail tn-8"></article>
                  <article className="thumbnail tn-9"></article>
                  <article className="thumbnail tn-10"></article>
                  <article className="thumbnail tn-11"></article>
                  <article className="thumbnail tn-12"></article>
                  <article className="thumbnail tn-13"></article>
                  <article className="thumbnail tn-14"></article>
                  <article className="thumbnail tn-15"></article>
                  <article className="thumbnail tn-16"></article>
                  <article className="thumbnail tn-17"></article>
                  <article className="thumbnail tn-18"></article>
                  <article className="thumbnail tn-19"></article>
                  <article className="thumbnail tn-20"></article>
                  <article className="thumbnail tn-21"></article>
                  <article className="thumbnail tn-22"></article>
                  <article className="thumbnail tn-23"></article>
                  <article className="thumbnail tn-24"></article>
                </div>
                <Button type="submit">
                    Verwijder selectie
                </Button>

            </section>
            <section className="title-logo-container">
                <h2>Jouw favoriete katten</h2>
                <p>Bewaar hier jouw lievelingsplaatjes en bekijk ze opnieuw wanneer je maar wilt! </p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>
            </section>
        </div>
    );
}

export default Favorites;