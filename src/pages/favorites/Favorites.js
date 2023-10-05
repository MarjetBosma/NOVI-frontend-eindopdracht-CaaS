import React, { useState, useEffect } from "react";
import "./Favorites.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Favorites() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        console.log(favorites);
    },[favorites])

    function handleImageClick(index) {
        const imgUrl = `/favorites/${index}`
        navigate(imgUrl)
    }

    function handleImageSelection(index) {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    }

    function handleDeleteSelection() {
        const updatedFavorites = favorites.filter((item, index) => !selectedImages.includes(index));
        console.log("Updated favorites:", updatedFavorites);

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log("Favorites in local storage after update:", JSON.parse(localStorage.getItem("favorites")));

        setSelectedImages([]);
    }

    return (
        <div className="inner-container">
            <section className="favorites-button-container">
                <ul className="favorites-container">
                    {favorites.map((imageUrl, index) => (
                        <li
                            key={index}
                            className={`thumbnail ${selectedImages.includes(index) ? "selected" : ""}`}>
                                <img className="cat-image"
                                     src={imageUrl}
                                     alt={`Fav. ${index + 1}`}
                                     onDoubleClick={() => handleImageClick(index)}
                                     onClick={() => handleImageSelection(index)}
                                     onError={(e) => {
                                         e.target.src = logo;
                                         e.target.className = "cat-image-fallback-thumbnail";
                                     }}
                                />
                        </li>
                    ))}
                </ul>
                <Button
                    type="button"
                    clickHandler={handleDeleteSelection}
                    disabled={selectedImages.length === 0}>
                    Verwijder selectie
                </Button>

            </section>
            <section className="title-logo-container">
                <h2>Jouw favoriete katten</h2>
                <p>Bewaar hier jouw lievelingsplaatjes en bekijk ze opnieuw wanneer je maar wilt! </p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="Logo Cat as a Service"/>
                </div>
            </section>
        </div>
    );
}

export default Favorites;