import React from "react";
import "../style/SendMessage.css";
function SendMessage({message}) {
  return (
    <div className="send-msg-container">
    <div className="msg-wrapper">
        {message !=='' ? (<div className="message-content">{message}</div>) : ''}
        <p className="time">Just now</p>
    </div>
    </div>
  );
}

export default SendMessage;
