import React from 'react'

export default function Meetings() {
    const style = {
        height:'90vh',
        width: '100%',
        border: '0px',
    }
  return (
    <>
      <section className="meetings mt-5 pt-5">
        <div className="container">
            <iframe
                allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay" 
                src="https://livezoon.com/join/$roomname" 
                style={style} 
            ></iframe>
        </div>
      </section>
    </>
  )
}
