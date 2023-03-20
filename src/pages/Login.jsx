import React, { useState, useContext } from "react";
import { AuthContext } from '../context/auth-context'

import "./Update.css";

const Login = () => {
    const auth = useContext(AuthContext)
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log({ form }, { errors });
    setFormIsValid(handleValidation(e.target.name, e.target.value));
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    async function authUser() {
      try {
        const response = await fetch(
          import.meta.env.VITE_APP_BACKEND_URL + "/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          });
          const responseData = await response.json()
          if (!response.ok){
            throw new Error(responseData.message)
          }
          console.log({responseData})
          auth.login(responseData.userId, responseData.token)
      } catch (err) {
        console.log(err)
      }
    }
    authUser();
  };

  const handleValidation = (itemToControl, itemValue) => {
    let inputErrors = "";
    let isFormValid = true;

    if (!itemToControl || itemToControl === "email") {
      if (!itemValue) {
        isFormValid = false;

        inputErrors = "L'email doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (
          !itemValue.match(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          )
        ) {
          isFormValid = false;

          inputErrors = "Doit être un email!";
        }
      }
    }

    if (!itemToControl || itemToControl === "password") {
      if (!itemValue) {
        isFormValid = false;

        inputErrors = "Le mot de passe doit être renseigné!";
      } else if (typeof itemValue !== undefined) {
        if (!itemValue.match(/[A-Za-z\d]$/)) {
          isFormValid = false;

          inputErrors = "Ne doit contenir que des alphanumériques!";
        }
      }
    }

    setErrors({...errors, 
        [itemToControl]: inputErrors});

    // setFormIsValid(isFormValid);

    // console.log("isFormValid", typeof (isFormValid));

    return isFormValid;
  };

  return (
    <div>
      <form className="form-rhf" onSubmit={authSubmitHandler}>
        <h3>Connexion</h3>
        <label htmlFor="email" className="label-rhf">
          Email<span>*</span>
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="input-rhf"
          placeholder="Renseigner l'email"
          onChange={(e) => handleChange(e)}
        />
        <span className="error-rhf" >{errors.email}</span>

        <label htmlFor="password" className="label-rhf">
          Password<span>*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-rhf"
          placeholder="Renseigner le mdp"
          onChange={(e) => handleChange(e)}
        />
        <span className="error-rhf" >{errors.password}</span>
        <input type="submit" className="input-rhf" />
      </form>
    </div>
  );
};

export default Login;
