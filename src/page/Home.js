import React, { useRef, useState } from "react";
import "../style/Home.css";
import User from "../component/User";
import SendMessage from "../component/SendMessage";
import ReceiveMessage from "../component/ReceiveMessage";

function Home() {
  const photos = useRef();
  const msg = useRef()
  const [toggle, setToggle] = useState(false);
  const [message,setMessage] = useState()

  function handleSelect() {
    photos.current.click();
  }
  function insertPhoto() {}

  function handleSend(e){
    e.preventDefault()
    setMessage(msg.current.value)
  }
  return (
    <>
      <div id="top"></div>

      <div className="home">
        {toggle ? (
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
                <input type="text" className="search" placeholder="Search..." />
                <button className="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="profiles">
                <User setToggle={setToggle} />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
              </div>
              <div className="small-menu">
                <a className="fixed-btn-a success">
                  {" "}
                  <i className="fa-solid fa-user-plus"></i>{" "}
                </a>
                <a href="#top" className="fixed-btn-a primary">
                  {" "}
                  <i className="fa-solid fa-arrow-up"></i>{" "}
                </a>
                <a className="fixed-btn-a danger">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </div>
            </div>
          </section>
        ) : (
          <section className="chat">
            <div className="header-msg">
              <div className="mini-profile-msg">
                <button className="exit-btn" onClick={(e) => setToggle(true)}>
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <img className="dp" src="images/dp.png" alt="" />
                <span className="username">username </span>
              </div>
            </div>

            <div className="chat-session">
              <SendMessage message={message}/>
              <ReceiveMessage/>
              <SendMessage/>
              <ReceiveMessage/>
              <SendMessage/>
              <ReceiveMessage/>
              <SendMessage/>
              <ReceiveMessage/>
            </div>

            <div className="messaging-session">
              <form onSubmit={handleSend} className="message-form">
                <input
                  ref={msg}
                  type="text"
                  name=""
                  id=""
                  className="msg-input"
                  placeholder="Message"
                />
                <input
                  type="file"
                  className="img-file"
                  onChange={insertPhoto}
                  accept="image/*"
                  ref={photos}
                />
                <button
                type="button"
                  className="success-outline  send-btn"
                  onClick={handleSelect}
                >
                  <i class="fa-solid fa-image"></i>
                </button>
                <button className="primary send-btn" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Home;
