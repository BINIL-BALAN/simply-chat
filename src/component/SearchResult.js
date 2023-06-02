import React,{useState} from 'react'
import '../style/User.css'
function SearchResult({user}) {
    // console.log(user);
    const [dpError, setDpError] = useState(true);
  return (
    <>
    <div className="user">
     <div style={{display:'flex',flexDirection:'row'}}>
          {dpError ? (
                <img
                  className="dp"
                  src={user?.photoURL}
                  alt=""
                  onError={e=>setDpError(false)}
                />
              ) : (
                <img className="dp" src={"images/dp.png"} alt="" />
              )}
          <div className="details">
              <div style={{width:'100%'}}><h4 className="name">{user?.displayName}</h4></div>
             <div> <span className="latest-msg">{user.lastMessage?.text}</span></div>
          </div>
     </div>
     <span className="badge"></span>
    </div>
  </>
  )
}

export default SearchResult