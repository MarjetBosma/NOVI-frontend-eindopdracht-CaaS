import React, { useState, useEffect } from "react";
import axios from "axios"
import "./Images.css"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";

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

    const controller = new AbortController();

    const navigate = useNavigate()

    const [error, toggleError] = useState(false);
    const [errorMessageImages, setErrorMessageImages] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [userInputCatSays, setUserInputCatSays] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });

    const fetchCatImage = async (source) => {
        try {
            toggleError(false);
            toggleLoading(true);

            const response = await axios.get(source, { responseType: "arraybuffer" });

            const contentType = response.headers["content-type"];
            const arrayBuffer = response.data;

            const blob = new Blob([arrayBuffer], { type: contentType });
            const imageUrl = URL.createObjectURL(blob);

            navigate("/cat", {
                state: {
                    imageUrl: imageUrl,
                },
            });
            console.log("Image opened at /cat", response.data);
        } catch (e) {
            console.error("Error fetching image", e);
            toggleError(true);
            setErrorMessageImages(
                "Ophalen van afbeelding mislukt. Server reageert mogelijk niet, probeer het later opnieuw."
            );
        }
        toggleLoading(false);
    };

    const fetchCatImageFromEndpoint = async (endpoint) => {
        await fetchCatImage(endpointUrls[endpoint]);
    };

    const fetchCatImageFromUrl = async (url) => {
        await fetchCatImage(url);
    };

    function handleFetchRandomCatFilter() {
        const catFilterUrl = endpointUrls.randomCatFilter.replace(":filter", selectedFilter);
        fetchCatImageFromUrl(catFilterUrl);
    }

  function handleFetchRandomCatSays(data) {

        const {"image-text": imagetext} = data
        setUserInputCatSays(imagetext)

        const catSaysUrl = endpointUrls.randomCatSays.replace(":text", imagetext);
        fetchCatImageFromUrl(catSaysUrl)
    }

    return (
        <div className="inner-container">
            <section className="image-request-container">

                <div className="button-container">
                    <div className="inner-button-container-left">
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImageFromEndpoint("randomCatImage")}>Random kat
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImageFromEndpoint("randomKitten")}>Random kitten
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            clickHandler={() => fetchCatImageFromEndpoint("randomGifCat")}>GIF afbeelding kat
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
                        <form
                            className="text-field-button-container"
                            onSubmit={handleSubmit(handleFetchRandomCatSays)}>
                            <InputField
                                inputType="text"
                                inputName="image-text"
                                inputLabel="Jouw tekst"
                                placeholder="Vul je eigen tekst in"
                                errors={{ "image-text" : { errors } }}
                                register={register}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 3,
                                        message: "Dit veld moet minimaal 3 karakters bevatten",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Dit veld mag maximaal 50 karakters bevatten",
                                    }
                            }}
                            />
                            {errors["image-text"] &&  (
                                <p className="error-message error-message--image-text">{errors["image-text"].message}</p>
                            )}
                            <Button
                                type="submit"
                                disabled={ !isDirty || !isValid }
                            >
                                Kat met jouw tekst
                            </Button>
                        </form>
                    </div>
                </div>
                {errorMessageImages && <div className="error-message error-message--images">{errorMessageImages}</div>}
                <p className="images-to-favorites-link">Eerder opgeslagen afbeeldingen bekijken? Ga naar je <Link to="/favorites">favorieten</Link>!</p>
            </section>
            <section className="title-logo-container">
                <h2>Vraag een kat op</h2>
                <p>Een wereld aan kattenplaatjes is slechts een muisklik van je verwijderd... Welke katten maken jou
                    blij vandaag? </p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="Logo Cat as a Service, cat with glasses and laptop"/>
                </div>
            </section>
        </div>
    )
}
 export default Images;




