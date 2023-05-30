import React from "react";
import "../style/SendMessage.css";
function SendMessage({message}) {
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
    <div className="send-msg-container">
    <div className="msg-wrapper">
        {message.text !=='' ? (<div className="message-content">{message.text}</div>) : ''}
        {message.img && <div className="message-content"><img className="msg-image" src={message.img} alt="" /></div>}
        <p className="time">{dateDisplay(message.date)}</p>
    </div>
    </div>
  );
}

export default SendMessage;
