import React, { useState } from "react";
import socketIO from "socket.io-client"
import {Routes,Route, Router} from 'react-router-dom'
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";
import './App.css'    

// const ENDPOINT  = 'http://localhost:4000';
// const socket = socketIO(ENDPOINT,{transports:['websocket']});

function App() {
  
 

  return (
    <div className="App"> 
    
    <Routes>
        <Route path="/" element={<Join/>} exact/>
        <Route path="/chat" element={<Chat/>}/>
    </Routes>
    </div>
   
  );
}

export default App;
