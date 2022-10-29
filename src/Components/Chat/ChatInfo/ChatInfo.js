import React, { useEffect, useState } from "react";
import "./ChatInfo.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
const ChatInfo = ({ peopleId, name, profilePic }) => {
  const [peopleMessages, setPeopleMessages] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .doc(peopleId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPeopleMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [peopleId]);
  return (
    <div className="chatInfo">
      <Link to={`/chat/${peopleId}`}>
        <Avatar className="chatInfo__image" src={profilePic} />
        <div className="chatInfo__details">
          <h2>{name}</h2>
          <p>{peopleMessages?.message}</p>
        </div>
        <p className="chatInfo__timestamp">{peopleMessages?.timestamp}</p>
      </Link>
    </div>
  );
};

export default ChatInfo;
