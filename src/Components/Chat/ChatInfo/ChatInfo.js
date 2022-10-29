import React from "react";
import "./ChatInfo.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const ChatInfo = ({ name, message, profilePic, timestamp }) => {
  return (
    <div className="chatInfo">
      <Link to={`/chat/${name}`}>
        <Avatar className="chatInfo__image" src={profilePic} />
        <div className="chatInfo__details">
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
        <p className="chatInfo__timestamp">{timestamp}</p>
      </Link>
    </div>
  );
};

export default ChatInfo;
