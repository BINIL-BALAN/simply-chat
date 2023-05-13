import React,{useState,useRef,useEffect} from 'react'
import '../style/Chat.css'
function Chat() {
  const windowSize = useRef([window.innerWidth,window.innerHeight])
  const divSection = useRef()
  useEffect(()=>{
    console.log(divSection);
   if(windowSize.current[0]>625){
      divSection.current.className='desktop'
   }else{
      divSection.current.className='mobile'
   }
  })
  return (
    <>
        <div className='desktop' ref={divSection}>hello</div>
    </>
  )
}

export default Chat