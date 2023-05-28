import React from 'react'
import '../style/ReceiveMessage.css'
function ReceiveMessage({message}) {
  return (
    <div className="receive-msg-container">
    <div className="msg-wrapper">
        <div className="receive-message-content">{message.text}</div>
        {message.img && <div className="receive-message-content"><img src={message.img} alt="" /></div>}
        <p className="receive-time">Just now</p>

    </div>
    </div>
  )
}

export default ReceiveMessage