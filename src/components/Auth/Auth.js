import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import { MasterContext } from "../../context/MasterContext";

const Auth = (props) => {
  const { setUser } = useContext(MasterContext);
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      usernameOrEmailInput: usernameInput,
      passwordInput,
    };
    axios
      .put("/auth/login", body)
      .then((res) => {
        navigate("home");
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const body = {
      usernameInput,
      passwordInput,
      firstNameInput: "passwordIsTEST",
      lastNameInput: "fake",
      emailInput: "garbage",
    };
    axios
      .post("/auth/register", body)
      .then(({ data }) => {
        console.log(data);
        console.log("REGISTER");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="auth-container">
      <div className="auth-container-background-blur"></div>
      <h1>GTKYN!</h1>
      <form onSubmit={isRegisterActive ? handleRegister : handleLogin}>
        <div className="auth-input-container">
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="USERNAME"
            required
          />
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="PASSWORD"
            required
          />
        </div>
        <button type="submit">LOGIN</button>
        <p onClick={() => setIsRegisterActive((old) => !old)}>
          SWITCH TO {isRegisterActive ? "LOGIN" : "REGISTER"}
        </p>
      </form>
    </section>
  );
};

export default Auth;
