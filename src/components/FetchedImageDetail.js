// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Button from "./Button";
// import "./FetchedImageDetail.css"
// function FetchedImageDetail() {
//     const location = useLocation();
//
//     const [ catImage, setCatImage ] = useState("")
//     const imageUrl = location?.state?.imageUrl || "";
//     console.log("cat object", catImage)
//
//
//     useEffect(() => {
//         setCatImage(imageUrl);
//     }, [imageUrl]);
//
//     console.log("catImage URL:", catImage);
//
//     const [error, toggleError] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//
//     const [favorites, updateFavorites] = useState(
//         JSON.parse(localStorage.getItem("favorites")) || []  )
//
//         const saveImageAsFavorite = (imageUrl) => {
//
//         if (favorites.length < 24 && !favorites.includes(imageUrl)) {
//             favorites.push(imageUrl);
//             localStorage.setItem("favorites", JSON.stringify(favorites));
//             setSuccessMessage("Afbeelding toegevoegd aan favorieten")
//             console.log("Afbeelding opgeslagen")
//         } else {
//             console.log("Maximum aantal afbeeldingen overschreden");
//             toggleError(true);
//             setErrorMessage("Je kunt maximaal 24 afbeeldingen opslaan in Favorieten.")
//         }
//     }
//
//     console.log("catImage URL:", catImage);
//     console.log("Image URL from state:", imageUrl);
//
//     return (
//         <div className="fetched-image-button-container">
//             <div className="fetched-image-container">
//                 <img className="fetched-image" src={catImage} alt="random cat" />
//             </div>
//             <Button
//                 className="add-to-favorites-button"
//                 clickHandler={() => saveImageAsFavorite(catImage)}
//                 disabled={favorites.includes(catImage)}
//             >
//                 Toevoegen aan favorieten
//             </Button>
//         </div>
//     );
// }
//
// export default FetchedImageDetail;