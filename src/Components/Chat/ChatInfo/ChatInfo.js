import React, { useEffect, useState } from "react";
import "./ChatInfo.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
const ChatInfo = ({ peopleId, name, profilePic }) => {
  const [peopleMessages, setPeopleMessages] = useState([]);

  useEffect(() => {
    db.collection("people")
      .doc(peopleId)
      .collection("chat")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setPeopleMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [peopleId]);
  return (
    <div className="chatInfo">
      <Link to={`/chat/${peopleId}`}>
        <Avatar className="chatInfo__image" src={profilePic} />
        <div className="chatInfo__details">
          <h2>{name}</h2>
          <p>{peopleMessages[0]?.message}</p>
        </div>
        <p className="chatInfo__timestamp">
          {new Date(peopleMessages[0]?.timestamp.toDate()).toLocaleTimeString()}
        </p>
      </Link>
    </div>
  );
};

export default ChatInfo;
