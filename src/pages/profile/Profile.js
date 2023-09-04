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

    const [profilePicture, setProfilePicture] = useState(""); // was null in de gecompliceerdere code, "" was een suggestie bij het gebruik van de versimpelde functies om bepaalde errors (type mismatch) te vermijden
    // in originele code staat deze voor de huidige profielfoto, indien niet null dan weergegeven als <img> object
    const [newProfilePicture, setNewProfilePicture] = useState(null); // in de versimpelde versie gebruik ik deze niet
    // in de originele code staat deze voor de nieuwe profielfoto, base64 representatie van de nieuw geselecteerde profielfoto;
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

    const handleProfilePictureUpload = (e) => {
        console.log("handleProfilePictureUpload function triggered");
        const file = e.target.files[0]; // haalt de geselecteerde afbeelding uit de input
        const imageUrl = URL.createObjectURL(file); // maakt een url voor de geselecteerde afbeelding, dit is the src voor het <img> element
        setProfilePicture(imageUrl); // Update de state met de imageUrl string
    };

    const handleUpdateProfilePicture = (imageURL) => {
        console.log("Updating profile picture on the server with URL:", imageURL);
        // hier gebeurt nu verder even niks, maar omdat de functie verderop aangeroepen wordt, declareer ik hem hier wel. In de originele versie zorgt dez functie voor het verzenden van de foto als base64 string naar de backend.
    };

    // Oorspronkelijke versie van handleProfilePictureUpload, inclusief de omzetting naar base64 string:

    // const handleProfilePictureUpload = (e) => {
    //     console.log("onChange in InputField triggered") // wordt nu niet gelogd
    //     const selectedFile = e.target.files[0]; // haalt de geselecteerde afbeelding uit de input
    //     const reader = new FileReader(); // maakt het leesbaar voor de browser
    //     console.log(selectedFile)
    //
    //     reader.onload = (event) => {
    //         const base64String = event.target.result; // zorgt voor base64 representatie van de afbeelding
    //         setNewProfilePicture(base64String); // updaten van de state met de base64 string
    //     };
    //
    //     reader.readAsDataURL(selectedFile); // leest de image file als een data URL in Base64 formaat
    //     console.log("handleProfilePictureUpload was triggered"); // deze wordt nu niet gelogd
    // };


    //     // Latere versie met gescheiden functies voor omzetten naar base64 en uploaden foto en state aanpassen (maakte geen verschil)
    //     // const convertToBase64 = (file) => { // argument is een file, in dit geval een foto
    //     //     return new Promise((resolve, reject) => {
    //     //         const fileReader = new FileReader();
    //     //         fileReader.readAsDataURL(file); // methode die de fileReader instrueert om de inhoud van de file te lezen en om te zetten naar een data URL in base 64 encoding
    //     //         fileReader.onload = () => { // eventhandler die wordt aangeroepen als de file succesvol gelezen is
    //     //             resolve(fileReader.result); // wordt angeroepen met het result, de data url / base64 string
    //     //             console.log(fileReader.result) // als dit is gedaan wordt de Promise gereturned
    //     //         };
    //     //         fileReader.onerror = (error) => { // error handling als het lezen en omzetten niet lukt
    //     //             reject(error);
    //     //             console.log(error)
    //     //         };
    //     //     });
    //     // };


    // Oorspronkelijke versie handleUpdateProfilePicture, met verzenden naar de backend

    // const handleUpdateProfilePicture = async () => {
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
    //         //Ik heb allerlei mogelijkheden voor foutmeldingen en andere logs in de code opgenomen, maar op dit moment wordt er helemaal NIETS gelogd als ik probeer een foto te uploaden...
    //         } catch (e) {
    //         console.error("Wijzigen profielfoto mislukt", e); // ik krijg GEEN error, maar ik zie toch echt geen foto...
    //         setErrorMessageProfilePic("Wijzigen profielfoto mislukt, probeer nogmaals.");
    //     }
    // };

useEffect(() => {
        console.log(user, newEmail, newPassword, repeatedPassword, newProfilePicture, profilePicture);

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
                                    setShowModalUserData(false)
                                } else {
                                    setShowModalUserData(true)
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
                          onSubmit={handleSubmit(async () => {
                              if (profilePicture)  {
                              await handleUpdateProfilePicture(profilePicture);
                              setShowModalProfilePic(false)
                              console.log("Closing the modal...)")
                        }
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
                           onChange={(e) => {
                               console.log("InputField onChange triggered"); // hier lijkt het mis te gaan, ik zie deze log niet als ik een foto probeer te uploaden, dus de onChange werkt niet
                               handleProfilePictureUpload(e); // zou de handleProfilePicture functie moeten triggeren
                           }}
                            register={register}
                            errors={errors}
                        />
                        {profilePicture && (
                            <img
                                className="uploaded-image"
                                src={profilePicture}
                                alt="selected image"
                            />
                        )}

                        {/*Eerdere versie met complexere code*/}
                        {/*<form className="upload-profile-picture-form"*/}
                        {/*      onSubmit={handleSubmit(async (data) => {*/}
                        {/*          await handleUpdateProfilePicture(data); // wacht met submitten tot deze functie is uitgevoerd*/}
                        {/*          setShowModalProfilePic(false) // sluit de modal na submitten*/}
                        {/*          //setNewProfilePicture(data.newProfilePicture[0])*/}
                        {/*          console.log(newProfilePicture);*/}
                        {/*          if (data.newProfilePicture[0] !== null) {*/}
                        {/*              handleUpdateProfilePicture(data.newProfilePicture[0]); // als de state van newProfilePicture niet null is, kan genoemde functie getriggerd worden*/}
                        {/*              console.log(data.newProfilePicture[0]); // Tot nu toe blijft de state van newProfilePicture null, omdat handleUploadProfilePicture, die moet zorgen voor de aanlevering van de afbeeldingsdata, niet getriggerd wordt.*/}
                        {/*          }*/}
                        {/*      })*/}
                        {/*      }*/}
                        {/*>*/}
                        {/*    <InputField*/}
                        {/*        className="input-field-profile-pic"*/}
                        {/*        inputType="file"*/}
                        {/*        inputName="newProfilePicture"*/}
                        {/*        validationRules={{*/}
                        {/*            validate: (value) =>*/}
                        {/*                value || "Selecteer een afbeelding voor je profielfoto",*/}
                        {/*        }}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            console.log("InputField onChange triggered"); // hier lijkt het mis te gaan, ik zie deze log niet als ik een foto probeer te uploaden,, dus de onChange werkt niet*/}
                        {/*            handleProfilePictureUpload(e); // zou de handleProfilePicture functie moeten triggeren*/}
                        {/*        }}*/}
                        {/*        register={register}*/}
                        {/*        errors={errors}*/}
                        {/*    /> */}


                        <Button
                            type="submit"
                            className="save-picture-button"
                            disabled={ !isDirty || !isValid }  // De button is niet disabled, maar er gebeurt ook nits. Geen foto, modal blijft open.
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
