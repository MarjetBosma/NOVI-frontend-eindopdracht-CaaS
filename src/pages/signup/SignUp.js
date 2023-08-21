import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./SignUp.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

function SignUp() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm();

    const [errorMessage, setErrorMessage] = useState("");

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

            try {
                const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", data, {
                });
                setErrorMessage("")
                console.log(response.data);
                console.log("Gebruiker is geregistreerd")
                navigate("/signin");

            } catch(e) {
                console.error("Registratie mislukt", e)
                toggleError(true);
                setErrorMessage("Registratie mislukt. Controleer je invoer en probeer het opnieuw.");
            }
            toggleLoading(false);
        }

    return (
        <div className="inner-container">
          <section className="signup-container">

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form className="signup-form"
                  onSubmit={handleSubmit(onSubmit)}>

              <InputField
                  inputType="text"
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
                  className="button"
                  disabled={loading || !isDirty || !isValid}>
                  Registreer
              </Button>
            </form>

            <p>Al bekend bij CaaS? Log dan <Link to="/signin">hier</Link> in.</p>
          </section>

          <section className="title-logo-container">
            <h2>Maak nu een account aan</h2>
            <p>Je hebt een account nodig om gebruik te kunnen maken van CaaS. Schrijf je nu in! </p>
            <div className="logo-container">
              <img className="logo-large" src={logo} alt="logo"/>
            </div>
          </section>
        </div>
    );
}

export default SignUp;