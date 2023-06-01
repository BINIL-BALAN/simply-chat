import React, { useRef, useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const userPassword = useRef();
  const userEmail = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlert] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    let email = userEmail.current.value;
    let password = userPassword.current.value;

    if (email !== "" && password !== "") {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
          setAlert(true);
        }, 1000);

        console.log("error", error);
      }
    }
    email === ""
      ? (userEmail.current.style.borderColor = "red")
      : (userEmail.current.style.borderColor = "white");
    password === ""
      ? (userPassword.current.style.borderColor = "red")
      : (userPassword.current.style.borderColor = "white");
  }

  return (
    <>
      <div className="bg-color">
        <div className="login-title">
          Simply Chat <i className="fa-regular fa-comment"></i>
        </div>
        {alertMsg && (
          <div className="text-danger text-center">
            {" "}
            Invalid email or password
          </div>
        )}
        <section className="login-container">
          <div className="login">
            <h2 className="login-h3">Login</h2>
            <form onSubmit={handleSubmit} className="input-form">
              <div className="login-input-container">
                <input
                  type="email"
                  ref={userEmail}
                  className="login-input"
                  placeholder="Email"
                />
              </div>
              <div className="login-password-container">
                <input
                  type={showPassword ? "password" : "text"}
                  ref={userPassword}
                  className="input-password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="login-btn-container">
                <button type="submit" className="login-btn">
                  {loading ? <div className="spinner-border"></div> : "Login"}
                </button>
                <a className="forgot-password">Forgot ?</a>
              </div>
            </form>
            <div className="or">Or</div>
            <div className="login-input-container">
              Create new account{" "}
              <a href="/register" className="click-here">
                click here
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
