import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FavoriteImageDetail() {
    const { index } = useParams();

    const favorites = localStorage.getItem("favorites");

    useEffect(() => {

        console.log("favorites")
    }, [favorites])



    // if (!favorites[index]) {
    //     console.log("Image not found")
    //     return <p>Image not found</p>;
    // }
    //
    // const imageUrl = favorites[index];
    // console.log("Image URL:", imageUrl);
    //
    // const handleRemoveClick = () => {
    //     const updatedFavorites = favorites.filter((_, i) => i !== Number(index));
    //     // updateFavorites(updatedFavorites);
    //     // useNavigate("/favorites");
    // };


    return (
        <div className="favorite-image-detail">
            {favorites && <img src={favorites[4]} alt={`Favorite ${index}`} />}
            {/*<button onClick={handleRemoveClick}>Remove from Favorites</button>*/}
        </div>
    );
}

export default FavoriteImageDetail;