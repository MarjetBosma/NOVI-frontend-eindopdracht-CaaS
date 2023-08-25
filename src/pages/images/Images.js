import React, { useState, useEffect } from "react";
import axios from "axios"
import "./Images.css"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

const endpointUrls = {
    randomCatImage: "https://cataas.com/cat",
    randomKitten: "https://cataas.com/cat/kitten",
    randomGifCat: "https://cataas.com/cat/gif",
    randomCatFilter: "https://cataas.com/cat/cat?filter=:filter",
    randomCatSays: "https://cataas.com/cat/says/:text",
}

function Images() {

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);

    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputError, setInputError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");

    const controller = new AbortController();

    const navigate = useNavigate()
    const fetchCatImage = async(endpoint) => {
        try {
            console.log("Fetching image from endpoint", endpoint)
            toggleError(false);
            toggleLoading(true);

            const response = await axios.get(endpointUrls[endpoint], {responseType: "arraybuffer"} );

            const contentType = response.headers["content-type"];
            const arrayBuffer = response.data;

            const blob = new Blob([arrayBuffer], { type: contentType });
            const imageUrl = URL.createObjectURL(blob);

            console.log("Full Response:", response);
            console.log("Image fetched", response.data)
            console.log("Content-Type", response.headers["content-type"]);

            navigate("/cat", {
                state: {
                    imageUrl: imageUrl
                }
            });
            console.log("Image opened at /cat", response.data);

        } catch(e) {
            console.error("Error fetching image", e);
            toggleError(true )
            setErrorMessage("Ophalen van afbeelding mislukt.");
        }
        toggleLoading(false);
    };

    const handleFetchRandomCatSays = () => {

        if (!userInput) {
            setInputError("Dit veld is verplicht");
            return;
        }
        setInputError("")

        console.log("User input before fetch:", userInput);

        const catSaysUrl = endpointUrls.randomCatSays.replace(":text", userInput);
        fetchCatImage(catSaysUrl);
        console.log(catSaysUrl)

        console.log("User input after fetch:", userInput);
    }

    const handleFetchRandomCatFilter = () => {
        const catFilterUrl = endpointUrls.randomCatFilter.replace(":filter", selectedFilter);
        console.log("Filter:", selectedFilter);
        fetchCatImage(catFilterUrl);
        console.log(catFilterUrl)
    }

    return (
        <div className="inner-container">
            <section className="image-request-container">

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="button-container">
                    <div className="inner-button-container-left">
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
                    <div className="inner-button-container-right">
                        <div className="select-menu-button-container">
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
                                disabled={loading || !selectedFilter}
                                clickHandler={() => handleFetchRandomCatFilter()}>Kat met filter
                            </Button>
                         </div>
                        <div className="text-field-button-container">
                            <InputField
                                inputType="text"
                                inputName="image-text"
                                inputLabel="Jouw tekst"
                                inputValue={userInput}
                                placeholder="Vul je eigen tekst in"
                                onChange={(e) => setUserInput(e.target.value)}
                                errors={{ "image-text" : inputError }}
                            />
                            {inputError && <p className="error-message">{inputError}</p>}
                            <Button
                                type="button"
                                disabled={loading || !userInput || inputError}
                                clickHandler={() => handleFetchRandomCatSays()}>Kat met jouw tekst
                            </Button>
                        </div>
                    </div>
                </div>
                <p className="images-to-favorites-link">Eerder opgeslagen afbeeldingen bekijken? Ga naar je <Link to="/favorites">favorieten</Link>!</p>
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
}
 export default Images;




