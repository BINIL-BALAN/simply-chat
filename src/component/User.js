import React,{useState,useEffect} from "react";
import '../style/User.css'
function User({setToggle,user}) {
  const [dpError, setDpError] = useState(true);
 
  return (
    <>
      <div className="user">
       <div style={{display:'flex',flexDirection:'row'}}>
            {dpError ? (
                  <img
                    className="dp"
                    src={user.userInfo?.photoURL}
                    alt=""
                    onError={e=>setDpError(false)}
                  />
                ) : (
                  <img className="dp" src={"images/dp.png"} alt="" />
                )}
            <div className="details">
                <div style={{width:'100%'}}><h4 className="name">{user.userInfo?.displayName}</h4></div>
               <div> <span className="latest-msg">{user.lastMessage?.text}</span></div>
            </div>
       </div>
       <span className="badge"></span>
      </div>
    </>
  );
}

export default User;
