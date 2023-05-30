import React from 'react'
import '../style/ReceiveMessage.css'
function ReceiveMessage({message}) {
  function dateDisplay(date){
    const time = date.toDate().toLocaleTimeString(undefined,{ hour: 'numeric', minute: 'numeric', hour12: true })
    const dateObj = new Date()
    const systemTime = dateObj.toLocaleTimeString(undefined,{ hour: 'numeric', minute: 'numeric', hour12: true }) 
    if(time === systemTime){
      return "Just now"
    }else{
      return time
    }
  }
  
  return (
    <div className="receive-msg-container">
    <div className="msg-wrapper">
      {message.text && <div className="receive-message-content">{message.text}</div>}
        {message.img && <div className="receive-message-content"><img className="msg-image" src={message.img} alt="" /></div>}
        <p className="receive-time">{dateDisplay(message.date)}</p>

    </div>
    </div>
  )
}

export default ReceiveMessage