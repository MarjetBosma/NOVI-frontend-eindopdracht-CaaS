import React, { useState, useContext, useEffect } from "react";
import "./SignIn.css"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/caas-logo-no-text.jpg";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function SignIn() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });
    const { login } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const controller = new AbortController();
    const navigate = useNavigate();

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        }
    }, []);

        async function onSubmit(data) {
            toggleError(false);
            toggleLoading(true);
            console.log(data);
            login();

            try {
                const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", data, {
                });

                setSuccessMessage("Je bent ingelogd");
                setErrorMessage("")
                console.log(response.data);
                login()
                navigate("/images");
            } catch(e) {

                console.error("Inloggen mislukt", e)
                setErrorMessage("Inloggen mislukt. Controleer je invoer en probeer het opnieuw.");
                setSuccessMessage("");
                toggleError(true);
            }
            toggleLoading(false);
        }

    return (
        <div className="inner-container">
          <section className="signin-container">

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form className="signin-form"
                  onSubmit={handleSubmit(onSubmit)}>
              <InputField
                  inputType="email"
                  inputName="email"
                  inputLabel="E-mailadres"
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
                    validationRules={{
                        required: "Dit veld is verplicht",
                        minLength: {
                            value: 6,
                            message: "Het wachtwoord moet minimaal 6 karakters bevatten",
                        }
                    }}
                    register={register}
                    errors={errors}
                />

                <Button
                    type="submit"
                    className="button"
                    disabled={loading || !isDirty || !isValid}>
                    Log in
                </Button>
              </form>

              <p>Nog geen account? Registreer je <Link to="/signup">hier</Link>.</p>
            </section>

            <section className="title-logo-container">
                <h2>Log in op je account</h2>
                <p>Log snel in voor je dagelijkse dosis kattenliefde!</p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="logo"/>
                </div>
            </section>
        </div>
    );
}

export default SignIn;