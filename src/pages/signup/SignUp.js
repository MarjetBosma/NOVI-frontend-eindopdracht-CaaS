import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./SignUp.css"
import logo from "../../assets/caas-logo-no-text.jpg";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

function SignUp() {
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm( { mode: "onChange" });

    const [errorMessageSignup, setErrorMessageSignup] = useState("");

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
                setErrorMessageSignup("")
                console.log(response.data);
                console.log("Gebruiker is geregistreerd")
                navigate("/signin");

            } catch(e) {
                console.error("Registratie mislukt", e)
                toggleError(true);
                setErrorMessageSignup("Registratie mislukt. Controleer je invoer, is deze gebruiker niet al bekend? Probeer het daarna opnieuw.");
            }
            toggleLoading(false);
        }

    return (
        <div className="inner-container">
          <section className="signup-container">

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
                    disabled={ !isDirty || !isValid }
                >
                    Registreer
              </Button>
            </form>

            <p>Al bekend bij CaaS? Log dan <Link to="/signin">hier</Link> in.</p>

            {errorMessageSignup && <div className="error-message error-message--signup">{errorMessageSignup}</div>}

          </section>

          <section className="title-logo-container">
            <h2>Maak een account</h2>
            <p>Je hebt een account nodig, schrijf je nu in! </p>
            <div className="logo-container">
              <img className="logo-large" src={logo} alt="logo"/>
            </div>
          </section>
        </div>
    );
}

export default SignUp;