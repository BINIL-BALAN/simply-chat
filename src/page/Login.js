import React, { useRef, useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const userPassword = useRef();
  const [resetPasswordStatus, setRestPasswordStatus] = useState({
    status: false,
    msg: "",
  });
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
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
  function handleResetPassword(e) {
    e.preventDefault();
    setPasswordResetLoading(true);
    sendPasswordResetEmail(auth, e.target[0].value)
      .then(() => {
        setPasswordResetLoading(false);
        setRestPasswordStatus({
          status: true,
          msg: "ChecK you email for password reset link",
        });
      })
      .catch((error) => {
        setPasswordResetLoading(false);
        setRestPasswordStatus({
          status: false,
          msg: "Somethig went wrong",
        });
        setTimeout(() => {
          setRestPasswordStatus({
            status: false,
            msg: "",
          });
        }, 3500);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
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
                  required
                />
              </div>
              <div className="login-password-container">
                <input
                  type={showPassword ? "password" : "text"}
                  ref={userPassword}
                  className="input-password"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i> 
                  )}
                </button>
              </div>
              <div className="login-btn-container">
                <button type="submit" className="login-btn">
                  {loading ? <div className="spinner-border"></div> : "Login"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Forgot password ?
                </button>
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

      {/* Modal  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Reset password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {resetPasswordStatus.status ? (
              <div className="text-success p-3 m-2">
                {resetPasswordStatus.msg}
              </div>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="modal-body">
                  {resetPasswordStatus.msg && (
                    <div className="text-danger text-center">
                      {resetPasswordStatus.msg}
                    </div>
                  )}
                  <label htmlFor="reset-email" className="form-label text-success">
                    Enter email address
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {passwordResetLoading ? (
                      <div className="spinner spinner-border"></div>
                    ) : (
                      "Reset"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
