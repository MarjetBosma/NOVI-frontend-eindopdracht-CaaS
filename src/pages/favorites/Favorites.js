import React, {useEffect} from "react";
import "./Favorites.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import {Link, useNavigate} from "react-router-dom";


function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const navigate = useNavigate();

    useEffect(() => {
        console.log(favorites);
    },[favorites])

    function handleImageClick(index) {
        const imgUrl = `/favorites/${index}`
        navigate(imgUrl)
    }

    return (
        <div className="inner-container">
            <section className="favorites-button-container">
                <ul className="favorites-container">
                    {favorites.map((imageUrl, index) => (
                        <li key={index} className="thumbnail">
                                <img src={imageUrl} alt={`Favorite ${index}`}
                                     onClick={() => handleImageClick(index)}
                                />
                        </li>
                    ))}
                </ul>
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