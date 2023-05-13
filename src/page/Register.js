import React,{useRef,useState,useEffect} from 'react'
import '../style/Register.css'
function Register() {
const [avatar,setAvatar] = useState('images/avatar.png')
const selectedImg = useRef()
useEffect(()=>{

},[])

function handleSelect(e){
e.preventDefault()
document.getElementById('image').click()
}

function insertImage(e){
 const imgSelected = e.target.files[0]
 const imgurl = URL.createObjectURL(imgSelected)
 setAvatar(imgurl)
}
  return (
    <>
    <div className="bg-color">

    <div className="register-title">
        Simply Chat <i className="fa-regular fa-comment"></i>
      </div>

      <section className="register-container">
          <div className="register">
            <h2 className="register-h3">Sign up</h2>
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
            <div className="register-btn-container2">
              <img className='register-avatar' width='50px' src={avatar} alt="" />
              <input type="file" accept="image/*" id='image' className='img-file' onChange={insertImage}/>
              <button type="button" className="avatar-btn" onClick={handleSelect}><i className="fa-solid fa-image"></i></button>
            </div>
            <div className="register-btn-container">
              <button type="submit" className="register-btn" >Register</button>
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