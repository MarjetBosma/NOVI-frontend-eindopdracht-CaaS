import React, { useState, useEffect } from "react";
import axios from "axios"
import "./Images.css"
import { Link } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

const endpointUrls = {
    randomCatImage: "https://cataas.com/cat",
    randomKitten: "https://cataas.com/cat/kitten",
    randomGifCat: "https://cataas.com/cat/gif",
    // randomCatSepiaFilter: "https://cataas.com/cat/cat?filter=sepia",
    // randomCatPaintFilter: "https://cataas.com/cat/cat?filter=paint",
    randomCatFilter: "https://cataas.com/cat/cat?filter=:filter",
    randomCatSays: "https://cataas.com/cat/says/:text",
}

function Images() {

    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");

    const controller = new AbortController();

    const fetchCatImage = async(endpoint) => {
        try {
            toggleError(false);
            toggleLoading(true);

            const response = await axios.get(endpointUrls[endpoint], {responseType: "arraybuffer"} );
            // const imageUrl = response.config.url;
            console.log(response.data)
            const imageBlob = new Blob([response.data], { type: response.headers["content-type"] });
            const imageUrl = URL.createObjectURL(imageBlob);

            const imageWindow = window.open("", "_blank");
            const imageContainer = document.createElement("div");
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            const saveButton = document.createElement("button");
            saveButton.classList.add("save-as-favorite-button");
            saveButton.textContent = "Opslaan in Favorieten";
            saveButton.addEventListener("click", () => {
                const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                if (!favorites.includes(imageUrl)) {
                    favorites.push(imageUrl);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                }
            });

            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(saveButton);
            imageWindow.document.body.appendChild(imageContainer);

            console.log(response.data);

        } catch(e) {
            console.error("Fout bij het ophalen van afbeelding", e);
            toggleError(true )
            setErrorMessage("Ophalen van afbeelding mislukt.");
        }
        toggleLoading(false);
    };
    const handleFetchRandomCatSays = () => {
        const catSaysUrl = endpointUrls.randomCatSays.replace(":text", userInput);
        fetchCatImage(catSaysUrl);

    const handleFetchRandomCatFilter = () => {
        const catFilterUrl = endpointUrls.randomCatSays.replace(":filter", selectedFilter);
        fetchCatImage(catFilterUrl);

     const saveImageAsFavorite = (imageUrl) => {
         const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
         if (favorites.length < 24 && !favorites.includes(imageUrl)) {
            favorites.push(imageUrl);
            localStorage.setItem("favorites", JSON.stringify(favorites));
         } else {
             console.log("Maximum aantal afbeeldingen overschreden");
             toggleError(true);
             setErrorMessage("Je kunt maximaal 24 afbeeldingen opslaan in Favorieten.")
         }
     }

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);


    return (
        <div className="inner-container">
            <section className="image-request-container">

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="button-container">
                    <div className="inner-button-container">
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImage("randomCatImage")}>Random kat
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImage("randomKitten")}>Random kitten
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImage("randomGifCat")}>GIF afbeelding kat
                        </Button>
                    </div>
                    <div className="inner-button-container">
                        {/*<Button*/}
                        {/*    type="button"*/}
                        {/*    disabled={loading}*/}
                        {/*    clickHandler={() => fetchCatImage("randomCatSepiaFilter")}>Kat met sepia-filter*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                        {/*    type="button"*/}
                        {/*    disabled={loading}*/}
                        {/*    clickHandler={() => fetchCatImage("randomCatPaintFilter")}>Kat met schilderij-filter*/}
                        {/*</Button>*/}
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="">Kies een filter</option>
                            <option value="blur">Blur</option>
                            <option value="mono">Mono</option>
                            <option value="sepia">Sepia</option>
                            <option value="negative">Negative</option>
                            <option value="paint">Paint</option>
                            <option value="pixel">Pixel</option>
                        </select>
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => handleFetchRandomCatFilter()}>Kat met filter
                        </Button>
                        <InputField
                            type="text"
                            value={userInput}
                            onInput={setUserInput}
                            placeholder="Vul je eigen tekst in"
                        />
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => handleFetchRandomCatSays()}>Kat met jouw tekst
                        </Button>
                    </div>
                </div>
                <p>Eerder opgeslagen afbeeldingen bekijken? Ga naar je <Link to="/favorites">favorieten</Link>!</p>
            </section>
            <section className="title-logo-container">
                <h2>Vraag hier een kat op</h2>
                <p>Een wereld aan kattenplaatjes is slechts een muisklik van je verwijderd... Welke katten maken jou
                    blij vandaag? </p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>

            </section>
        </div>
    )
}}}
 export default Images;




