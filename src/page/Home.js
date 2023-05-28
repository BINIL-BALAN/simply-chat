import React, { useRef, useState, useContext,useEffect } from "react";
import "../style/Home.css";
import User from "../component/User";
import Chat from "../component/Chat";
import SearchResult from "../component/SearchResult";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  
  const [user, setUser] = useState(null);
  const [seachUser, setSeachUser] = useState(null);
  const [username, setUsername] = useState("");
  const [toggle, setToggle] = useState(true);
  const [err, setErr] = useState(false);
  const [dpError, setDpError] = useState(true);
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);

  function handleDpError() {
    setDpError(false);
  }

  const { currentUser } = useContext(AuthContext);

  async function handleSearch(e) {
    console.log("search clicked");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      console.log("searching user");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("inside loop", doc.data());
        setSeachUser(doc.data());
      });
      console.log("search completed", querySnapshot);
    } catch (err) {
      console.log("error", err);
      setErr(true);
    }
  }


  async function handleSelectSearchUser(){
    setSeachUser(null)
    console.log("user selected");
    setToggle(false)

    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser.uid + user?.uid
        : user?.uid + currentUser?.uid;
        console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

  }
function handleSelectUser(selectedUser){
  console.log("user selected");
  setToggle(false)
  dispatch({ type: "CHANGE_USER", payload: selectedUser });
}
  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  },[currentUser.uid])
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
                {dpError ? (
                  <img
                    className="dp"
                    src={currentUser?.photoURL}
                    alt=""
                    onError={handleDpError}
                  />
                ) : (
                  <img className="dp" src={"images/dp.png"} alt="" />
                )}
                <span className="username">{currentUser?.displayName} </span>
                {/* <button className="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button> */}
              </div>
            </div>

            <div className="feed">
              <div className="search-container">
                <input
                  type="text"
                  className="search"
                  placeholder="Search..."
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <button className="search-btn" onClick={(e) => handleSearch(e)}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                {err && (<div className="text-secondary">User not found</div>)}
                {
                  seachUser && (<div onClick={handleSelectSearchUser}><SearchResult user={seachUser}/></div>)
                }
              </div>
              <div className="profiles">
                {
                 Object.entries(chats)?.map(user=>(
                    <div key={user[0]} onClick={()=>handleSelectUser(user[1].userInfo)}><User setToggle={setToggle} user={user[1]}/></div>
                 ))
                }
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
                <a className="fixed-btn-a danger" onClick={() => signOut(auth)}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </div>
            </div>
          </section>
        ) : (
            <Chat setToggle={setToggle} signout={signOut} auth={auth}/>
        )}
      </div>
    </>
  );
}

export default Home;

// https://firebasestorage.googleapis.com/v0/b/simply-chat-398c4.appspot.com/o/name%2011684558433867?alt=media&token=66651920-f812-4814-936a-281e4acefeb5
