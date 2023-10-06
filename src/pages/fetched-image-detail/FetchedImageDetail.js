import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";
import "./FetchedImageDetail.css"
function FetchedImageDetail() {
    const location = useLocation();

    const [ catImage, setCatImage ] = useState({})
    const imageUrl = location.state && location.state.imageUrl ? location.state.imageUrl : "";

    useEffect(() => {
        setCatImage(imageUrl);
    }, [imageUrl]);

    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [favorites, updateFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []  )

        const saveImageAsFavorite = (imageUrl) => {

        if (favorites.length < 24 && !favorites.includes(imageUrl)) {
            favorites.push(imageUrl);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setSuccessMessage("Afbeelding toegevoegd aan favorieten")
        } else {
            toggleError(true);
            setErrorMessage("Je kunt maximaal 24 afbeeldingen opslaan in Favorieten.")
        }
    }

    return (
        <div className="fetched-image-button-container">
            <div className="fetched-image-container">
                <img className="fetched-image" src={catImage} alt="random cat" />
            </div>
            <Button
                type="button"
                className="add-to-favorites-button"
                clickHandler={() => saveImageAsFavorite(catImage)}
                disabled={favorites.includes(catImage)}
            >
                Toevoegen aan favorieten
            </Button>
        </div>
    );
}

export default FetchedImageDetail;