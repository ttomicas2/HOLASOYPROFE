import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, errors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleFocus = (ev) => {
    ev.target.placeholder = "";
  };
  const handleBlur = (ev, originalPlaceholder) => {
    ev.target.placeholder = originalPlaceholder;
  };
  const handleErrors = (err) => {
    if (err.length > 0) {
      return (
        <div className="error__container">
          {errors.map((err, i) => (
            <div className="error__text" key={i}>
              {err}
            </div>
          ))}
        </div>
      );
    }
  };
  return (
    <>
      {handleErrors(errors)}
      <form
        className="form"
        onSubmit={async (ev) => {
          ev.preventDefault();
          const user = {
            user: name,
            mail: mail,
            password: password,
          };
          if (name != "" && mail != "" && password != "") {
            signup(user);
          }
        }}
      >
        <h1>Sign up</h1>
        <div className="input__container">
          <input
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={(ev) => handleBlur(ev, "User")}
            className="inputs"
            placeholder="User"
            type="text"
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div className="input__container">
          <input
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={(ev) => handleBlur(ev, "Email")}
            className="inputs"
            placeholder="Email"
            type="text"
            name="mail"
            value={mail}
            onChange={(ev) => setMail(ev.target.value)}
          />
        </div>
        <div className="input__container">
          <input
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={(ev) => handleBlur(ev, "Password")}
            className="inputs"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Registrarse
        </button>
        <div className="message">
            <p>Have an account?</p><a href="/login">Sign in</a>
        </div>
      </form>
      
    </>
  );
}

export default RegisterPage;
