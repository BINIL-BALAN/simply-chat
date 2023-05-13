import React, { useRef, useState } from "react";
import "../style/Home.css";
import User from "../component/User";
function Home() {
  const chat = useRef();
  const [toggle, seToggle] = useState(false);
  function setWidth0() {
    chat.current.style.width = "0%";
  }
  function setWidth100() {
    chat.current.style.width = "100%";
  }

  function handleSlide() {
    seToggle(!toggle);
    console.log(toggle);
    if (toggle) {
      setWidth100();
    } else {
      setWidth0();
    }
  }

  return (
    <>
    <div id="top"></div>
      <div className="home">
        <section className="side-bar">
          <div className="header">
            <h3 className="app-title">
              Simply chat &nbsp;<i className="fa-regular fa-comment"></i>
            </h3>
            <div className="mini-profile">
            <img className="dp" src="images/dp.png" alt="" />
              <span className="username">username </span>
              {/* <button className="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button> */}
            </div>
          </div>

          <div className="feed">
          <div className="search-container">
                <input
                  type="text"
                  className="search"
                  placeholder="Search..."
                />
                <button className="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
              <div className="profiles">
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
               <User/>
              
          </div>
      <div className="small-menu">
        <a className="fixed-btn-a success"> <i class="fa-solid fa-user-plus"></i> </a>
        <a href="#top" className="fixed-btn-a primary"> <i class="fa-solid fa-arrow-up"></i> </a>
        <a className="fixed-btn-a danger"><i class="fa-solid fa-right-from-bracket"></i></a>
      </div>
          </div>
         
        </section>

        <section className="chat">chat</section>

      </div>
    </>
  );
}

export default Home;
