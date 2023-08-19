import React, { useState, useContext, useEffect } from "react";
import "./Profile.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import profilePicPlaceholder from "../../assets/profile-pic-placeholder.png"
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

function Profile() {

    const {user} = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log(user)
        const controller = new AbortController();

        const handleProfilePictureUpload = (event) => {
            const selectedFile = event.target.files[0];
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
                const response = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user/', updatedInfo, FormData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal
                });
                console.log(response.data, "Gebruikersgegevens gewijzigd");
                setSuccessMessage("Gebruikersgegevens gewijzigd")

            } catch (e) {
                console.error("Wijzigen gebruikersgegevens mislukt", e);
                setErrorMessage("Wijzigen gebruikersgegevens mislukt")
            }
        }

        return function cleanup() {
            controller.abort();
        }
    }, [user]);


    return (
        <div className="inner-container">
            <section className="profile-container">
                <article className="picture-button-container">
                    <div className="picture-container">
                        <img
                            className="profile-pic-placeholder"
                            src={profilePicture ? URL.createObjectURL(profilePicture) : profilePicPlaceholder}
                            alt="profile picture"
                        />
                    </div>
                    <div className="button-container-profile">
                        <Button>Upload/wijzig foto</Button>
                    </div>
                </article>
                <article className="info-button-container">
                    <div className="info-container">
                        <p><strong>Gebruikersnaam: </strong></p>
                        <p>{user.username}</p>
                        <p><strong>E-mailadres: </strong></p>
                        <p>{user.email}</p>
                        <p><strong>Wachtwoord: </strong></p>
                        <p>{user.password}</p>
                        <p><strong>Bekijk je <Link to="/favorites">favorieten</Link>.</strong></p>
                    </div>
                    <div className="button-container-profile">
                        <Button
                            clickHandler={() => setShowModal(true)}>Wijzig gegevens
                            >Wijzig gegevens</Button>
                    </div>
                </article>
            </section>

            <section className="title-logo-container">
                <h2>Jouw profiel</h2>
                <p>Bekijk of wijzig hier je gegevens.</p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>
            </section>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h2>Wijzig gegevens</h2>
                        <input
                            type="text"
                            placeholder="Nieuwe gebruikersnaam"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nieuw e-mailadres"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nieuw wachtwoord"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                        />
                        <Button clickHandler={handleUpdateUserInfo}>
                            Opslaan
                        </Button>
                    </div>
                </div>

            )}
        </div>
    );
}

export default Profile;