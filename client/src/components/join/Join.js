import React, { useState } from "react";
import "./join.css";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const [name, setname] = useState("");

  const senduser = () => {
    user = document.getElementById("j1").value;
    //  console.log(user)

    document.getElementById("j1").value = "";
  };

  // console.log(name);
  return (
    <div className="joinpage">
      <div className="container">
        <h1>NCHAT</h1>

        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter your name"
          type="text"
          id="j1"
        />

        <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat">

          <button onClick={senduser} className="jbtn">
            Login
          </button>


        </Link>
      </div>
    </div>
  );
};

export default Join;

export { user };
