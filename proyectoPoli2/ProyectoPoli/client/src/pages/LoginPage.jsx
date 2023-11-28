import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const { login, errors, isAuthenticated} = useAuth();
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
      <form className="form" onSubmit={async (ev) => {
        ev.preventDefault();
        const user = {
          mail,
          password,
        }
        if (mail != "" && password != "") {
          login(user);
        }
      }}>
        <h1>Login</h1>
        <div className="input__container">
          <input
            autoComplete="off"
            onFocus={handleFocus}
            onBlur={(ev) => handleBlur(ev, "Email")}
            className="inputs"
            type="text"
            name="mail"
            placeholder="Email"
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
            type="password"
            name="mail"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Ingresar
        </button>
        <div className="message">
            <p>Don´t have an account?</p><a href="/register">Sign up</a>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
