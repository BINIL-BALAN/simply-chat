import React from "react";
import "../style/SendMessage.css";
function SendMessage({message}) {

  return (
    <div className="send-msg-container">
    <div className="msg-wrapper">
        {message.text !=='' ? (<div className="message-content">{message.text}</div>) : ''}
        {message.img && <div className="message-content"><img className="msg-image" src={message.img} alt="" /></div>}
        <p className="time">Just now</p>
    </div>
    </div>
  );
}

export default SendMessage;
