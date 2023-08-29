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

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });

    const [profilePicture, setProfilePicture] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessageProfile, setErrorMessageProfile] = useState("");
    const [successMessageProfile, setSuccessMessageProfile] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleUpdateUserData = async (data) => {
        const token = localStorage.getItem("token");
        const updatedUserData = {};
        console.log(updatedUserData)

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
            setSuccessMessageProfile("Gebruikersgegevens gewijzigd");
        } catch (e) {
            console.error("Wijzigen gebruikersgegevens mislukt", e);
            setErrorMessageProfile("Wijzigen gebruikersgegevens mislukt");
        }
    };

    const handleProfilePictureUpload = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result;
            setProfilePicture(selectedFile);
            setNewProfilePicture(base64String);
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
            setSuccessMessageProfile("Profielfoto gewijzigd");
        } catch (e) {
            console.error("Wijzigen profielfoto mislukt", e);
            setErrorMessageProfile("Wijzigen profielfoto mislukt");
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     const newErrors = {};
    //
    //     if (!newUsername) {
    //          newErrors.username = "Dit veld is verplicht"
    //         } else if (newUsername.length < 6) {
    //             newErrors.username = "Gebruikersnaam moet minimaal 6 karakters bevatten";
    //     }
    //     if (!newEmail) {
    //          newErrors.email = "Dit veld is verplicht"
    //         } else if (!newEmail.includes("@")) {
    //             newErrors.email = "E-mailadres moet een @ bevatten"
    //     }
    //     if (!newPassword) {
    //         newErrors.newPassword = "Dit veld is verplicht";
    //         } else if (newPassword.length < 6) {
    //             newErrors.password = "Wachtwoord moet minimaal 6 karakters bevatten";
    //     }
    //     if (!newPasswordRepeat) {
    //         newErrors.repeatedpassword = "Dit veld is verplicht"
    //     } else if (newPasswordRepeat.length < 6) {
    //          newErrors.repeatedpassword = "Wachtwoord moet minimaal 6 karakters bevatten";
    //     }
    //     if (newPassword !== newPasswordRepeat) {
    //         newErrors.repeatedpassword = "Wachtwoorden komen niet overeen"
    //     }
    //
    //     if (Object.keys(newErrors).length === 0) {
    //         await handleUpdateProfilePicture();
    //         await handleUpdateUserData();
    //         console.log("New username:", newUsername);
    //         console.log("New email:", newEmail);
    //         console.log("New password:", newPassword);
    //     } else {
    //         toggleErrors(newErrors);
    //     }
    //
    //     setIsFormValid(validateForm());
    //
    //     console.log("New username:", newUsername);
    //     console.log("New email:", newEmail);
    //     console.log("New password:", newPassword);
    // };

    // const validateForm = () => {
    //
    //     const areFieldsFilled = newUsername && newEmail && newPassword && newPasswordRepeat;
    //     const areErrorsPresent = Object.keys(errors).some((key) => errors[key]);
    //
    //     return areFieldsFilled && !areErrorsPresent;
    // };


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
                        type="button"
                        clickHandler={() => setShowModal(true)}
                        disabled={showModal}
                    >Wijzig gegevens
                    </Button>
                </div>
            </section>

            {showModal && (
                <div className="modal">
                   <span className="close"
                         onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                    <div className="modal-content">
                        <div className="error-message-container">
                            {errorMessageProfile && <div className="error-message error-message--profile">{errorMessageProfile}</div>}
                            {successMessageProfile && <div className="success-message">{successMessageProfile}</div>}
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
                                inputName="newUsername"
                                inputLabel="Gebruikersnaam"
                                placeholder={"Nieuwe gebruikersnaam"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 6,
                                        message: "De gebruikersnaam moet minimaal 6 karakters bevatten",
                                    }
                                }}
                                register={register}
                                errors={errors}
                            />
                            <InputField
                                inputType="email"
                                inputName="newEmail"
                                inputLabel="E-mailadres"
                                placeholder = {"Nieuw e-mailadres"}
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
                                inputName="newPassword"
                                inputLabel="Nieuw wachtwoord"
                                placeholder={"Nieuw wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                    value: 6,
                                    message: "Het wachtwoord moet minimaal 6 karakters bevatten",
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
                                inputLabel="Herhaal nieuw wachtwoord"
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
                                    handleProfilePictureUpload(e);
                                }}
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
                        {errorMessageProfile && <div className="error-message error-message--signin">{errorMessageProfile}</div>}
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
