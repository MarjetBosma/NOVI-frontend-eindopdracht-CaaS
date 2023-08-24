import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form"
import "./Profile.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import profilePicPlaceholder from "../../assets/profile-pic-placeholder.png"
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

function Profile() {

    const { user } = useContext(AuthContext);
    const { register, setValue, formState: { errors, isDirty, isValid } } = useForm();

    const [profilePicture, setProfilePicture] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleUpdateUserData = async (data) => {
        const token = localStorage.getItem("token");

        const updatedUserData = {};
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
                "https://frontend-educational-backend.herokuapp.com/api/user/",
                updatedUserData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data, "Gebruikersgegevens gewijzigd");
            setSuccessMessage("Gebruikersgegevens gewijzigd");
        } catch (e) {
            console.error("Wijzigen gebruikersgegevens mislukt", e);
            setErrorMessage("Wijzigen gebruikersgegevens mislukt");
        }
    };

    const handleProfilePictureUpload = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result;
            setProfilePicture(selectedFile); // Store the selected file in state
            setNewProfilePicture(base64String); // Store the base64-encoded image data in state
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpdateProfilePicture = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/user/image",
                {
                    image: newProfilePicture,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data, "Profielfoto gewijzigd");
            setSuccessMessage("Profielfoto gewijzigd");
        } catch (e) {
            console.error("Wijzigen profielfoto mislukt", e);
            setErrorMessage("Wijzigen profielfoto mislukt");
        }
    };


    const handleSubmit = async (data) => {
        await Promise.all([handleUpdateUserData(data), handleUpdateProfilePicture()]);
        console.log(data);
    };


    useEffect(() => {
        console.log(user, newEmail, newPassword, newProfilePicture, newUsername, profilePicture);

        return function cleanup() {
        }

    }, [user, newEmail, newPassword, newProfilePicture, newUsername, profilePicture]);


    return (
        <div className="inner-container">
            <section className="profile-button-container">
              <div className="profile-container">
                <article className="picture-container">
                        <img
                            className="profile-pic-placeholder"
                            src={profilePicture ? URL.createObjectURL(profilePicture) : profilePicPlaceholder}
                            alt="profile picture"
                        />
                </article>
                <article className="info-container">
                        <p><strong>Gebruikersnaam: </strong></p>
                        <p>{user.username}</p>
                        <p><strong>E-mailadres: </strong></p>
                        <p>{user.email}</p>
                        <p className="profile-to-favorites-link"><strong>Bekijk je <Link to="/favorites">favorieten</Link>.</strong></p>
                </article>
              </div>
                <div className="button-container-profile">
                    <Button
                        clickHandler={() => setShowModal(true)}
                        disabled={showModal}
                    >Wijzig gegevens
                    </Button>
                </div>
            </section>

            {showModal && (
                <div className="modal">
                   <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                    <div className="modal-content">
                        <div className="error-message-container">
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                        <form
                            className="update-userdata-form"
                            onSubmit={handleSubmit((data) => {
                                handleUpdateUserData(data);
                                if (profilePicture) {
                                    handleUpdateProfilePicture();
                                }
                            })}
                        >
                            <InputField
                                inputType="text"
                                inputName="username"
                                inputLabel="Gebruikersnaam"
                                inputValue={newUsername}
                                placeholder={"Nieuwe gebruikersnaam"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 6,
                                        message: "De gebruikersnaam moet minimaal 6 karakters bevatten",
                                    }}}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                inputType="email"
                                inputName="email"
                                inputLabel="E-mailadres"
                                inputValue={newEmail}
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
                                inputName="password"
                                inputLabel="Wachtwoord"
                                inputValue={newPassword}
                                placeholder={"Nieuw wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 6,
                                        message: "De gebruikersnaam moet minimaal 6 karakters bevatten",
                                    },
                                    validate: (value) =>
                                        value === newPasswordRepeat || "Wachtwoorden komen niet overeen",
                                }}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                inputType="password"
                                inputName="repeatedPassword"
                                inputLabel="Herhaal wachtwoord"
                                inputValue={newPasswordRepeat}
                                placeholder={"Herhaal het nieuwe wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 6,
                                        message: "Het wachtwoord moet minimaal 6 karakters bevatten",
                                    },
                                    validate: (value) =>
                                        value === newPassword || "Wachtwoorden komen niet overeen",
                                }}
                                register={register}
                                errors={errors}
                            />
                            <label className="input-label-profile-pic">Profielfoto
                            </label>
                            <InputField
                                inputType="file"
                                inputName="newProfilePicture"
                                validationRules={{
                                    validate: (value) =>
                                        value || "Selecteer een afbeelding voor je profielfoto",
                                }}
                                onChange={(e) => {
                                    setValue("newProfilePicture", e.target.files[0]);
                                    handleProfilePictureUpload(e);
                                }}
                                register={register}
                                errors={errors}
                            />
                            <Button
                                type="submit"
                                className="save-profile-changes-button"
                                disabled={!isDirty || !isValid}>
                                Opslaan
                            </Button>
                        </form>
                    </div>
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
