import React, { useState, useContext, useEffect } from "react";
import "./Profile.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import profilePicPlaceholder from "../../assets/profile-pic-placeholder.png"
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

function Profile() {

    const [profilePicture, setProfilePicture] = useState(null);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [errorMessageProfilePic, setErrorMessageProfilePic] = useState("");
    const [errorMessageProfile, setErrorMessageProfile] = useState("");
    const [showModalUserData, setShowModalUserData] = useState(false);
    const [showModalProfilePic, setShowModalProfilePic] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });

    const { user, setUser } = useContext(AuthContext);

    const resetForm = () => {
        reset();
    };

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);

    const controller = new AbortController();

    // Gebruikersgegevens

    const handleUpdateUserData = async (data) => {
        const token = localStorage.getItem("token");
        const updatedUserData = data;
        console.log("Updated user data", updatedUserData)
        console.log(data);

        if (data.username) {
            updatedUserData.username = data.username;
        }
        if (data.email) {
            updatedUserData.email = data.email;
        }

        if (data.password && data.repeatedPassword) {
            updatedUserData.password = data.password;
            updatedUserData.repeatedPassword = data.repeatedPassword;
        }

        try {
            const response = await axios.put(
                "https://frontend-educational-backend.herokuapp.com/api/user/", {
                    email: updatedUserData.newEmail,
                    password: updatedUserData.newPassword,
                    repeatedPassword: updatedUserData.repeatedPassword,
                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data, "Gebruikersgegevens gewijzigd");

            setUser({
                username: user.username,
                email: data.newEmail || user.email,
                id: user.id,
            });

        } catch (e) {
            console.error("Wijzigen gebruikersgegevens mislukt", e);
            setErrorMessageProfile("Wijzigen gegevens mislukt. Mogelijke oorzaken: 1) wachtwoorden ongelijk of e-mailadres niet geldig. Controleer je invoer. 2) Server reageert niet, probeer het later opnieuw.");
        }
    };

    // Profielfoto

    // Hieronder de beperkte functie die alleen zorgt voor het tonen van de geüploade profielfoto op de pagina

    const handleProfilePictureUpload = (e) => {
        const imageUrl = URL.createObjectURL(e[0]); // maakt een url voor de geselecteerde afbeelding, dit is de src voor het <img> element
        setProfilePicture(imageUrl);
    };

    // Hieronder de originele functie waarbij ik probeer de geüploade foto om te zetten in base64 formaat. Dit gaf tijdens alle verschillende pogingen een hele range aan foutmeldingen...

    // const handleProfilePictureUpload = (e) => {
    //    const file = e.target.files[0]; // haalt de geselecteerde afbeelding uit de input
    //          console.log(file);
    //          const fileReader = new FileReader(); // maakt het leesbaar voor de browser
    //          fileReader.readAsDataURL(file);
    //
    //         fileReader.onload = async () => {
    //             const base64Image = fileReader.result // zorgt voor base64 representatie van de afbeelding
    //              setNewProfilePicture(base64Image); // updaten van de state met de base64 string
    //              await handleUpdateProfilePicture(base64Image);
    //         };
    //         fileReader.readAsDataURL(file);
    // };

    // Hieronder de beperkte versie van handleUpdateProfilePicture, omdat het niet lukt om om de juiste vorm van data te creëren om naar de backend te zenden. Ik roep de functie wel aa hierboven, dus vandaar deze simulatieversie.

    const handleUpdateProfilePicture = (imageURL) => {
        console.log("Simulating updating profile picture on the server", imageURL); // Deze console.log heb ik laten staan, aangezien deze aangeeft dat het een simulatie is.
    };

    // Hieronder de oorspronkelijke versie handleUpdateProfilePicture, met verzenden naar de backend. Deze functie an sich is oké, maar ik kan hem niet gebruiken, omdat ik niet de data in base64 formaat heb.

    // const handleUpdateProfilePicture = async (newProfilePicture) => {
    //     const token = localStorage.getItem("token");
    //
    //     try {
    //         if(newProfilePicture) { // dus alleen als newProfilePicture niet null of undefined is
    //             const response = await axios.post(
    //                 "https://frontend-educational-backend.herokuapp.com/api/user/image",
    //                 {
    //                     base64Image: newProfilePicture, // Base64 data naar backend
    //                 },
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //             if (response.status === 200) {
    //                 console.log("Upload successful");
    //                 console.log(response.data, "Profielfoto gewijzigd");
    //                 // de upload moet succesvol zijn geweest, voordat de nieuwe foto wordt ingesteld
    //                 setProfilePicture(newProfilePicture);
    //                 console.log("profilePicture updated:", profilePicture);
    //             } else {
    //                 console.error("Upload failed:", response.statusText);
    //             }
    //         } else {
    //             console.log("newProfilePicture is null or undefined");
    //         }
    //
    //         } catch (e) {
    //         console.error("Wijzigen profielfoto mislukt", e);
    //         setErrorMessageProfilePic("Wijzigen profielfoto mislukt, probeer nogmaals.");
    //     }
    // };

useEffect(() => {
    }, [user, newEmail, newPassword, repeatedPassword, newProfilePicture, profilePicture]);


    return (
        <div className="inner-container">
            <section className="profile-container">
                <article className="info-button-container">
                    <div className="info-container">
                        <p><strong>Gebruikersnaam: </strong></p>
                        <p>{user.username}</p>
                        <p><strong>E-mailadres: </strong></p>
                        <p>{user.email}</p>
                        <p className="profile-to-favorites-link"><strong>Bekijk je <Link to="/favorites">favorieten</Link>.</strong></p>
                    </div>
                    <Button
                        type="button"
                        className="changeUserdataButton"
                        clickHandler={() => setShowModalUserData(true)}
                        disabled={showModalUserData}
                        >
                        Wijzig gegevens
                    </Button>
                </article>
                <article className="picture-button-container">
                    <div className="picture-container">
                        <img
                            className="profile-pic-placeholder"
                            src={profilePicture ? profilePicture : profilePicPlaceholder}
                            alt="profile picture"
                        />
                    </div>
                    <Button
                        type="button"
                        className="uploadProfilePicButton"
                        clickHandler={() => setShowModalProfilePic(true)}
                        disabled={showModalProfilePic}
                        >
                        Upload / wijzig foto
                    </Button>
                </article>
            </section>

            {showModalUserData && (
                <div className="modal-userdata">
                   <span className="close-modal-userdata"
                         onClick={() => {
                             setShowModalUserData(false);
                             resetForm();
                             setErrorMessageProfile("")
                         }}
                   >
                            &times;
                        </span>
                    <div className="modal-userdata-content">
                        <form
                            className="update-userdata-form"
                            onSubmit={handleSubmit(async (data) => {
                                await handleUpdateUserData(data);
                                if (errorMessageProfile) {
                                    setShowModalUserData(true)
                                } else {
                                    setShowModalUserData(false)
                                }
                          })
                        }
                        >
                            <InputField
                                inputType="email"
                                inputName="newEmail"
                                inputLabel="E-mailadres"
                                placeholder = {"Nieuw e-mailadres"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    validate: (value) => value.includes('@') || "E-mailadres moet een @ bevatten",
                                }}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                inputType="password"
                                inputName="newPassword"
                                inputLabel="Nieuw wachtwoord"
                                placeholder={"Nieuw wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                    value: 6,
                                    message: "Het wachtwoord moet minimaal 6 karakters bevatten",
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                inputType="password"
                                inputName="repeatedPassword"
                                inputLabel="Herhaal nieuw wachtwoord"
                                placeholder={"Herhaal het nieuwe wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                    value: 6,
                                    message: "Het wachtwoord moet minimaal 6 karakters bevatten",
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />
                            <Button
                                type="submit"
                                className="save-profile-changes-button"
                                disabled={ !isDirty || !isValid }
                            >
                                Opslaan
                            </Button>
                        </form>
                        {errorMessageProfile && <div className="error-message error-message--profile">{errorMessageProfile}</div>}
                    </div>
                </div>
            )}

            {showModalProfilePic && (
                <div className="modal-profile-pic">
                   <span className="close-modal-pic"
                         onClick={() => setShowModalProfilePic(false)}>
                            &times;
                    </span>
                    <label className="input-label-profile-pic">Kies een afbeelding
                    </label>
                    <form className="upload-profile-picture-form"
                          onSubmit={handleSubmit(async (e) => {
                              await handleUpdateProfilePicture(newProfilePicture);
                              handleProfilePictureUpload(e.profilePicture)
                                  setShowModalProfilePic(false)

                        })
                      }
                    >
                        <InputField
                           className="input-field-profile-pic"
                           inputType="file"
                           inputName="profilePicture"
                           accept={".jpeg, .png, .jpg"}
                           validationRules={{
                                validate: (value) =>
                                value || "Selecteer een afbeelding voor je profielfoto",
                            }}
                           // onChange={(e) => {
                           //      console.log("InputField onChange triggered");
                           //      handleProfilePictureUpload(e)
                           // }}
                           register={register}
                           errors={errors}
                        />

                        <Button
                            type="submit"
                            className="save-picture-button"
                            disabled={ !isDirty || !isValid }
                        >
                            Opslaan
                        </Button>
                        {errorMessageProfilePic && <div className="error-message error-message--profile-pic">{errorMessageProfilePic}</div>}
                    </form>
                </div>
                )}

            <section className="title-logo-container">
                <h2>Jouw profiel</h2>
                <p>Bekijk of wijzig hier je gegevens.</p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>
            </section>
        </div>
    );
}

export default Profile;
