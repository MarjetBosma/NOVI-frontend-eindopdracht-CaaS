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

    const [errorMessageSignin, setErrorMessageSignin] = useState("");

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

            try {
                const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", data, {
                });
                setErrorMessageSignin("")
                login(response.data.accessToken)
                navigate("/images");

            } catch(e) {

                console.error("Inloggen mislukt", e)
                toggleError(true);
                setErrorMessageSignin("Inloggen mislukt. Mogelijke oorzaken: 1) Gebruiker is niet bekend 2) Typefout in je invoer 3) Server reageert niet, probeer het later opnieuw.");
            }
            toggleLoading(false);
        }

    return (
        <div className="inner-container">
          <section className="signin-container">

            <form className="signin-form"
                  onSubmit={handleSubmit(onSubmit)}>
              <InputField
                  inputType="username"
                  inputName="username"
                  inputLabel="Gebruikersnaam"
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
                    inputType="password"
                    inputName="password"
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
                    disabled={ !isDirty || !isValid }
                >
                    Log in
                </Button>
              </form>

              <p>Nog geen account? Registreer je <Link to="/signup">hier</Link>.</p>

              {errorMessageSignin && <div className="error-message error-message--signin">{errorMessageSignin}</div>}

            </section>

            <section className="title-logo-container">
                <h2>Log in op je account</h2>
                <p>Log snel in voor je dagelijkse dosis kattenliefde!</p>
                <div className="logo-container">
                    <img className="logo-large" src={logo} alt="Logo Cat as a Service, cat with glasses and laptop"/>
                </div>
            </section>
        </div>
    );
}

export default SignIn;