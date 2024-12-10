/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)

    const cardRef = useRef(null); // Referensi untuk elemen card-item

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        onSent(prompt)
    }

      // Fungsi untuk mendeteksi klik di luar elemen card-item
    const handleOutsideClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowCard(false); // Sembunyikan card-item jika klik di luar
      }
    };

    useEffect(() => {
      if (showCard) {
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        document.removeEventListener('mousedown', handleOutsideClick);
      }

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [showCard]);

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <div className="top-menu">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <p>Gemini</p>
        </div>
        <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
        </div>
        {extended
        ?
        <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index)=> {
                return (
            // eslint-disable-next-line react/jsx-key
            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
            </div>  
                )            
        })}
        </div>
        : null
    }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={()=>setShowCard(prev=>!prev)}>
            <img src={assets.info_icon} alt="" />
            {extended?<p>Info</p>:null}        
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>:null}        
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}        
        </div>
      </div>
      {showCard? 
        <div ref={cardRef} className="card-item">
          &quot;App developed by <a href='https://www.linkedin.com/in/fanjaaa/' target='blank' rel='noopener noreferrer'>Fanjaa</a>. Special thanks to the <a href='https://ai.google.dev/' target='blank' rel='noopener noreferrer'>Gemini AI</a> team for providing the powerful API that makes this app possible.&quot;
        </div>
      :null}
    </div>
  )
}

export default Sidebar
