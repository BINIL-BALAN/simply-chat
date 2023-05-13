import React from 'react'
import '../style/Register.css'
function Register() {
  return (
    <>
    <div className="bg-color">

    <div className="register-title">
        Simply Chat <i className="fa-regular fa-comment"></i>
      </div>

      <section className="register-container">
          <div className="login">
            <h2 className="login-h3">Login</h2>
       <form className="input-form">
       <div className="login-input-container">
              <input type="email"  className="login-input" placeholder="Username"/>
            </div>
            <div className="login-input-container">
              <input type="email"  className="login-input" placeholder="Email"/>
            </div>
            <div className="login-input-container">
              <input type="password" className="login-input" placeholder="Password"/>
            </div>
            <div className="register-btn-container">
              <button type="submit" className="register-btn">Register</button>
            </div>
       </form>
       <div className="or">Or</div>
  
  <div className="login-input-container">
    Already have an account ? <a href="/" className="click-here">Login</a>
  </div>
          </div>
      </section>
      
    </div>
  </>
  )
}

export default Register