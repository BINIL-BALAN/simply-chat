import React from "react";
import '../style/User.css'
function User({setToggle}) {
 
  return (
    <>
      <div className="user" onClick={e=>setToggle(false)}>
       <div style={{display:'flex',flexDirection:'row'}}>
            <img src="images/dp.png" alt="" className="profile-img" />
            <div className="details">
                <div style={{width:'100%'}}><h4 className="name">username</h4></div>
               <div> <span className="latest-msg">hellovdfgdfhfhf</span></div>
            </div>
       </div>
       <span className="badge">2</span>
      </div>
    </>
  );
}

export default User;
