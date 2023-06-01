import React, { useRef, useState, useEffect } from "react";
import "../style/Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [err, setErr] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("images/avatar.png");
  // const selectedImg = useRef();
  useEffect(() => {}, []);

  function handleSelect(e) {
    e.preventDefault();
    document.getElementById("image").click();
  }

  function insertImage(e) {
    const imgSelected = e.target.files[0];
    setFile(imgSelected);
    // console.log(imgSelected);
    const imgurl = URL.createObjectURL(imgSelected);
    setAvatar(imgurl);
  }
  function handleCheckNumber(e) {
    if (e.target.value.length !== 10) {
      setNumberCheck(true);
    } else {
      setNumberCheck(false);
    }
  }

  function handleCheckPassword(e) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/;
    if (regex.test(e.target.value)) {
      setPasswordCheck(true);
      setPasswordCheckMsg("Strong password");
    } else {
      setPasswordCheck(false);
      setPasswordCheckMsg(
        "Password must have 7 characters,One or more special characters,Uppercase letters,Lowercase letters,one or more digits"
      );
    }
  }
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const password = e.target[3].value;
    // const file = e.target[4].files[0];
    console.log(displayName);
    console.log(email);
    console.log(phone);
    console.log(password);
    console.log(file);

    // firebase authentication
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            console.log("downloadURL", downloadURL);
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              phone,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setStatus(true);
            setErr(false);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } catch (err) {
            setStatus(true);
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setStatus(true);
      setErr(true);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="bg-color">
        <div className="register-title">
          Simply Chat <i className="fa-regular fa-comment"></i>
        </div>
        {status ? (
          <div
            className={
              err
                ? "text-danger m-2 text-center"
                : "text-success m-2 text-center"
            }
          >
            {err ? "Registration failed" : "Registration successfull"}
          </div>
        ) : (
          ""
        )}
        <section className="register-container">
          <div className="register">
            <h2 className="register-h3">Sign up</h2>
            <form onSubmit={handleSubmit} className="input-form">
              <div className="login-input-container">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="login-input-container">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login-input-container">
                <input
                  type="tel"
                  className="login-input"
                  onChange={handleCheckNumber}
                  placeholder="Phone number"
                  required
                />
              </div>
              {numberCheck && (
                <div className="text-danger">
                  Phone number less than 10 digits
                </div>
              )}
              <div className="login-password-container">
                <input
                  type={showPassword ? "password" : "text"}
                  className="input-password"
                  onChange={handleCheckPassword}
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
              {passwordCheck ? (
                <p className="text-info">{passwordCheckMsg}</p>
              ) : (
                <p className="text-warning px-4 text-justify">
                  {passwordCheckMsg}
                </p>
              )}
              <div className="register-btn-container2">
                <img
                  className="register-avatar"
                  width="50px"
                  src={avatar}
                  alt=""
                />
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="img-file"
                  onChange={insertImage}
                />
                <button
                  type="button"
                  className="avatar-btn"
                  onClick={handleSelect}
                >
                  <i className="fa-solid fa-image"></i>
                </button>
              </div>
              <div className="register-btn-container">
                <button type="submit" className="register-btn">
                  {loading ? (
                    <div className="spinner-border"></div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
            <div className="or">Or</div>

            <div className="login-input-container">
              Already have an account ?{" "}
              <a href="/" className="click-here">
                Login
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;

// .then((userCredential) => {
//   const user = userCredential.user;
//   console.log(user);
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log(errorMessage);
// });
