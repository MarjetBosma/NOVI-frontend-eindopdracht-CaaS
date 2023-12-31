import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./FavoriteImageDetail.css"
import logo from "../../assets/caas-logo-no-text.jpg";

function FavoriteImageDetail() {

    const { index } = useParams();

    const [error, setError] = useState(false)

    const [favorites, updateFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    const navigate = useNavigate()

    useEffect(() => {
    }, [favorites])


    if (!favorites[index]) {
        return <p>Afbeelding niet gevonden</p>;
    }

    const imageUrl = favorites[index];

    const handleRemoveClick = () => {
        localStorage.setItem("favorites", "")
        updateFavorites(favorites.splice(index, 1))
        localStorage.setItem("favorites", JSON.stringify(favorites))
        navigate("/favorites");
    };

    return (
        <div className="favorite-image-button-container" >
            <div className="favorite-image-container">
                {favorites ? (
                    <img
                        className="favorite-image"
                        src={favorites[index]}
                        alt={`Favorite cat ${index}`}
                        onError={(e) => {
                            e.target.src = logo;
                            e.target.className = "cat-image-fallback-favorite";
                            setError(true);
                        }}
                    />
                ) : (
                    <div className="error-message error-message--favorite-detail">Laden van afbeelding mislukt. Mogelijke oorzaak: server reageert niet. Probeer het later nogmaals.</div>
                )}
            </div>
            <Button
                type="button"
                className="remove-from-favorites-button"
                clickHandler={handleRemoveClick}
            >
                Verwijderen uit favorieten
            </Button>
        </div>
    );
}

export default FavoriteImageDetail;