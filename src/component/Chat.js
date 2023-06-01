import React, { useState, useRef, useEffect, useContext } from "react";
import "../style/Chat.css";
import SendMessage from "../component/SendMessage";
import ReceiveMessage from "../component/ReceiveMessage";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
function Chat({ setToggle, signout, auth }) {
  // const [text, setText] = useState();
  const [img, setImg] = useState();
  const [dpError, setDpError] = useState(true);
  const [chatLoading,setChatLoading] = useState(false)
  const [themeColor, setThemeColor] = useState(
    window.localStorage.getItem("theme") || "white"
  );
  const msg = useRef();
  const modalRef = useRef()
  const themeSelector = useRef();
  const photos = useRef();
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const chatArea = useRef();

  async function handleSend(e) {
    e.preventDefault();
    setChatLoading(true)
    const chatMsg = msg.current.value;
    msg.current.value = "";
    // setText(msg.current.value);

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Object exists, proceed with further operations
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: chatMsg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (error) {
            setChatLoading(false)
            // Handle object-not-found error
            console.log("Object does not exist:", error);
          }
        }
      );
    } else {
      if (chatMsg !== "") {
        await updateDoc(doc(db, "chats", data?.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: chatMsg,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        try {
          await updateDoc(doc(db, "userChats", currentUser?.uid), {
            [data?.chatId + ".lastMessage"]: {
              text: chatMsg,
            },
            [data?.chatId + ".date"]: serverTimestamp(),
          });
        } catch (err) {
          console.log("first error", err);
        }

        try {
          await updateDoc(doc(db, "userChats", data?.user.uid), {
            [data?.chatId + ".lastMessage"]: {
              text: chatMsg,
            },
            [data?.chatId + ".date"]: serverTimestamp(),
          });
        } catch (err) {
          console.log("second error", err);
        }
      }
    }
  }

  function handleDpError() {
    setDpError(false);
  }

  function handleThemeChange(e) {
    window.localStorage.setItem("theme", e.target.value);
    setThemeColor(e.target.value);
  }
function updateMessage(message){
  if(messages.length < message.length){
    modalRef.current.click()
    setMessages(message)
  }
}
  useEffect(() => { 
    const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
      doc.exists() && updateMessage(doc.data()?.messages)
      setChatLoading(false)
    });
         chatArea.current.scrollTop = chatArea.current.scrollHeight; 
    return () => {
      unSub();
    };
  }, [data.chatId,messages]);

  return (
    <>
      <section className="chat">
        <div className="header-msg">
          <div className="mini-profile-msg">
            <button className="exit-btn" onClick={(e) => setToggle(true)}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            {dpError ? (
              <img
                className="dp"
                src={data.user.photoURL}
                alt=""
                onError={handleDpError}
              />
            ) : (
              <img className="dp" src={"images/dp.png"} alt="" />
            )}
            <span className="username">{data.user.displayName} </span>
          </div>
          <input
            ref={themeSelector}
            className="theme-selector"
            type="color"
            value={themeColor}
            onChange={handleThemeChange}
          />
          <div className="dropdown">
            <button
              className="btn text-light border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              <i className="fa-solid fa-ellipsis-vertical"></i>{" "}
            </button>
            <ul className="dropdown-menu">
              <li onClick={() => themeSelector.current.click()}>
                <a className="dropdown-item" href="#">
                  Change theme
                </a>
              </li>
              <li onClick={() => signout(auth)}>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={chatArea}
          className="chat-session"
          style={{ backgroundColor: themeColor }}
        >
          {messages?.map((message, index) =>
            message.senderId === currentUser.uid ? (
              <SendMessage message={message} key={index} />
            ) : (
              <ReceiveMessage message={message} key={index} />
            )
          )}
        </div>

        {/* <div id="adj" className="adjuster"></div> */}

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
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              ref={photos}
            />
            
            <button
              type="button"
              className="btn text-secondary send-btn"
              data-bs-toggle="modal"
              data-bs-target="#select-image"
            >
              <i className="fa-solid fa-paperclip"></i>
            </button>
            <button className="primary send-btn" type="submit">
            {chatLoading ? <div className="spinner spinner-border"></div> : <i className="fa-solid fa-paper-plane"></i>}
            </button>
          </form>
        </div>
      </section>

      <div
        
        className="modal fade show"
        id="select-image"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Send image
              </h1>
              <button
                ref={modalRef}
                type="button"
                onClick={() => setImg("")}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {" "}
              </button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              {img ? (
                <img
                  className="h-100 w-75 border-rounded"
                  src={URL.createObjectURL(img)}
                  alt=""
                />
              ) : (
                <img
                  className="h-100 w-75 border-rounded"
                  src="images/img.png"
                  alt=""
                />
              )}
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                onClick={() => photos.current.click()}
                className="btn text-success success-outline  send-btn"
              >
                <i className="fa-regular fa-image"></i>
              </button>
              <button
                onClick={handleSend}
                className="primary send-btn"
                type="button"
              >
                {chatLoading ? <div className="spinner spinner-border"></div> : <i className="fa-solid fa-paper-plane"></i>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Chat);

// https://github.com/safak/youtube2022/tree/react-chat  const container = chatArea.current;
        // container.scrollTop = container.scrollHeight - container.clientHeight; 
        //doc.exists() && setMessages(doc.data()?.messages);
