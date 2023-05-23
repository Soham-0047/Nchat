import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import socketIO from "socket.io-client";
import "./chat.css";
import Message from "../messages/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT = "http://localhost:4000";

const Chat = () => {
  const [id, setId] = useState("");

  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatinput").value;

    socket.emit("message", { message, id });

    document.getElementById("chatinput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("Connected")
      setId(socket.id);
    });

    socket.emit("join", { user });

    socket.on("Welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userjoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconn");
      socket.off();
    };
  }, []);

  //Second useEffect

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatdiv">
      <div className="mainContainer">
        <div className="header">
          <h2>NChat</h2>
          <a href="/">
            <ion-icon name="close" id="close"></ion-icon>
          </a>
        </div>
        <ReactScrollToBottom className="chat">
          {messages.map((item, e) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputdiv">
          <input
            type="text"
            onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
            id="chatinput"
          />

          <button onClick={send} className="sendbtn">
            <ion-icon name="send" id="close"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
