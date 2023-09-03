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
    // huidige profielfoto, indien niet null dan weergegeven als <img> object
    // profilePicture wordt gebruikt op regel 162, 179, 181 en 208
    // setProfilePicture op regel 161
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    // nieuwe profielfoto, base64 representatie van de nieuw geselecteerde profielfoto;
    // newProfilePicture wordt gebruikt op regel 118, 145, 149, 162, 180, 182 en 313
    // setNewProfilePicture op regel 119
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

    // Gescheiden functies voor omzetten naar base64 en uploaden foto en state aanpassen
    const convertToBase64 = (file) => { // argument is een file, in dit geval een foto
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file); // methode die de fileReader instrueert om de inhoud van de file te lezen en om te zetten naar een data URL in base 64 encoding
            fileReader.onload = () => { // eventhandler die wordt aangeroepen als de file succesvol gelezen is
                resolve(fileReader.result); // wordt angeroepen met het result, de data url / base64 string
                console.log(fileReader.result) // als dit is gedaan wordt de Promise gereturned
            };
            fileReader.onerror = (error) => { // error handling als het lezen en omzetten niet lukt
                reject(error);
                console.log(error)
            };
        });
    };

    const handleProfilePictureUpload = async (e) => {
        console.log("handleProfilePictureUpload function triggered"); // wordt nu niet gelogd
        const file = e.target.files[0]; // haalt de geselecteerde afbeelding uit de input
        console.log("Selected File:", file);
        try {
            const base64 = await convertToBase64(file); // wacht het resultaat af van functie convertToBase64
            setNewProfilePicture(base64); // hiermee wordt de nieuwe profielfoto ingesteld
            console.log(newProfilePicture)
        } catch (error) {
            console.error(error);
        }
    };

    // Eerdere versie van handleProfilePictureUpload, inclusief de omzetting naar base64 string:

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

    const handleUpdateProfilePicture = async () => {
        const token = localStorage.getItem("token");

        try {
            if(newProfilePicture) { // dus alleen als newProfilePicture niet null of undefined is
                const response = await axios.post(
                    "https://frontend-educational-backend.herokuapp.com/api/user/image",
                    {
                        base64Image: newProfilePicture, // Base64 data naar backend
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    console.log("Upload successful");
                    console.log(response.data, "Profielfoto gewijzigd");
                    // de upload moet succesvol zijn geweest, voordat de nieuwe foto wordt ingesteld
                    setProfilePicture(newProfilePicture);
                    console.log("profilePicture updated:", profilePicture);
                } else {
                    console.error("Upload failed:", response.statusText);
                }
            } else {
                console.log("newProfilePicture is null or undefined");
            }
            //Ik heb allerlei mogelijkheden voor foutmeldingen en andere logs in de code opgenomen, maar op dit moment wordt er helemaal NIETS gelogd als ik probeer een foto te uploaden...
            } catch (e) {
            console.error("Wijzigen profielfoto mislukt", e); // ik krijg GEEN error, maar ik zie toch echt geen foto...
            setErrorMessageProfilePic("Wijzigen profielfoto mislukt, probeer nogmaals.");
        }
    };

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
                            // src={logo} // Dit was om te testen, deze afbeelding wordt correct weergegeven
                            // src={profilePicPlaceholder} // test: geef parsing error, wat vreemd is. Import statement klopt, en in de originele code werkt het wel (achter :)
                            // src={URL.createObjectURL(profilePicture)} // test: geeft een parsing error, ook vreemd. In de originele code werkt het wel (achter ?)
                            src={profilePicture ? URL.createObjectURL(profilePicture) : profilePicPlaceholder} // huidige profielfoto wordt hier weergegeven, indien die er niet is de placeholder
                            alt="profile picture"
                        />
                    </div>
                    <Button
                        type="button"
                        className="uploadProfilePicButton"
                        clickHandler={() => setShowModalProfilePic(true)} // opent de modal
                        disabled={showModalProfilePic} // werkt niet als de modal al open is
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
                          onSubmit={handleSubmit(async (data) => {
                              if (newProfilePicture) // controleert of er een nieuwe profielfoto is
                              await handleUpdateProfilePicture(data); // wacht tot deze functie is uitgevoerd
                          setShowModalProfilePic(false) // sluit de modal na submitten

                          // Eerdere versie:
                          //setNewProfilePicture(data.newProfilePicture[0])
                          // console.log(newProfilePicture);
                          // if (data.newProfilePicture[0] !== null) {
                          //     handleUpdateProfilePicture(data.newProfilePicture[0]); // als de state van newProfilePicture niet null is, kan genoemde functie getriggerd worden
                          //     console.log(data.newProfilePicture[0]); // Tot nu toe blijft de state van newProfilePicture null, omdat handleUploadProfilePicture, die moet zorgen voor de aanlevering van de afbeeldingsdata, niet getriggerd wordt.
                          // }
                        })
                      }
                    >
                        <InputField
                           className="input-field-profile-pic"
                           inputType="file"
                           inputName="newProfilePicture"
                           validationRules={{
                                validate: (value) =>
                                value || "Selecteer een afbeelding voor je profielfoto",
                            }}
                           onChange={(e) => {
                               console.log("InputField onChange triggered"); // hier lijkt het mis te gaan, ik zie deze log niet als ik een foto probeer te uploaden,, dus de onChange werkt niet
                               handleProfilePictureUpload(e); // zou de handleProfilePicture functie moeten triggeren
                           }}
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
