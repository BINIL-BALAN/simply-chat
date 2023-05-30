import React, { useRef, useState, useEffect } from "react";
import "../style/Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [status,setStatus] = useState(false)
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("images/avatar.png");
  const selectedImg = useRef();
  useEffect(() => {
   
  }, []);

  function handleSelect(e) {
    e.preventDefault();
    document.getElementById("image").click();
  }

  function insertImage(e) {
    const imgSelected = e.target.files[0];
    console.log(imgSelected);
    const imgurl = URL.createObjectURL(imgSelected);
    setAvatar(imgurl);
  }

  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    //firebase authentication
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            console.log('downloadURL',downloadURL);
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
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setStatus(true)
            setErr(false)
            setTimeout(()=>{
              navigate("/");
            },2000)
          } catch (err) {
            setStatus(true)
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setStatus(true)
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
        {status ?( <div className={err ? "text-danger m-2 text-center" : "text-success m-2 text-center"}>{err ? "Registration failed" : "Registration successfull"}</div>) : ""}
        <section className="register-container">
          <div className="register">
            <h2 className="register-h3">Sign up</h2>
            <form onSubmit={handleSubmit} className="input-form">
              <div className="login-input-container">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Username"
                />
              </div>
              <div className="login-input-container">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email"
                />
              </div>
              <div className="login-input-container">
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                />
              </div>
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
                  {loading? (<div className="spinner-border"></div>) : "Register"}
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
