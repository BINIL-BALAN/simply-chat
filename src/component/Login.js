import React,{useRef} from "react";
import "../style/Login.css";

function Login() {

  const password = useRef()
  const email = useRef()

function handleSubmit(e){
  e.preventDefault()
 let userEmail = email.current.value
  let userassword = password.current.value
  
}

  return (
    <>
      <div className="bg-color">

      <div className="login-title">
          Simply Chat <i className="fa-regular fa-comment"></i>
        </div>

        <section className="login-container">
            <div className="login">
              <h2 className="login-h3">Login</h2>
         <form onSubmit={handleSubmit} className="input-form">
              <div className="login-input-container">
                <input type="email" ref={email} className="login-input" placeholder="Email"/>
              </div>
              <div className="login-input-container">
                <input type="password" ref={password} className="login-input" placeholder="Password"/>
              </div>
              <div className="login-btn-container">
                <button type="submit" className="login-btn">Login</button>
                <a className="forgot-password">Forgot ?</a>
              </div>
         </form>
              <div className="or">Or</div>
              <div className="login-input-container">
                Create new account <a href="/register" className="click-here">click here</a>
              </div>
            </div>
        </section>
        
      </div>
    </>
  );
}

export default Login;
