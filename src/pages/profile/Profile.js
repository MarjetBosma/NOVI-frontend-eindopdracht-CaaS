import React, { useState, useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form"
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
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

    const [profilePicture, setProfilePicture] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleProfilePictureUpload = (e) => {
        const selectedFile = e.target.files[0];
        setProfilePicture(selectedFile);
    };

    const handleUpdateUserInfo = async () => {
        const token = localStorage.getItem("token");
        const updatedInfo = {};

        if (newUsername) {
            updatedInfo.username = newUsername;
        }
        if (newEmail) {
            updatedInfo.email = newEmail;
        }
        if (newPassword) {
            updatedInfo.password = newPassword;
        }

        const formData = new FormData();
        if (newUsername) {
            formData.append("username", newUsername);
        }
        if (newEmail) {
            formData.append("email", newEmail);
        }
        if (newPassword) {
            formData.append("password", newPassword);
        }
        if (profilePicture) {
            formData.append("profilePicture", newProfilePicture);
        }

        try {

            const response = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user/",
                updatedInfo,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
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


    useEffect(() => {
        console.log(user)
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [newEmail, newPassword, newProfilePicture, newUsername, profilePicture, user]);


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
                        <p><strong>Wachtwoord: </strong></p>
                        <p>{user.password}</p>
                        <p><strong>Bekijk je <Link to="/favorites">favorieten</Link>.</strong></p>
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
                        {/*<h3>Wijzig gegevens</h3>*/}
                        <form
                            className="update-userdata-form"
                            onSubmit={handleSubmit(handleUpdateUserInfo)}>
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
                                inputName="username"
                                inputLabel="Wachtwoord"
                                inputValue={newPassword}
                                placeholder={"Nieuw wachtwoord"}
                                validationRules={{
                                    required: "Dit veld is verplicht",
                                    minLength: {
                                        value: 6,
                                        message: "De gebruikersnaam moet minimaal 6 karakters bevatten",
                                    }}}
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
                                onChange={handleProfilePictureUpload}
                                register={register}
                                errors={errors}
                            />

                            <Button
                                type="submit"
                                disabled={!isDirty || !isValid}>Opslaan
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
