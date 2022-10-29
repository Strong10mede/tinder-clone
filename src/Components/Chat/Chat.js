import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import "./Chat.css";
import ChatInfo from "./ChatInfo/ChatInfo";
function Chat() {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    db.collection("people").onSnapshot((snapshot) => {
      setPeoples(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
        }))
      );
    });
  }, []);
  return (
    <div className="chat">
      {peoples.map((people) => (
        <ChatInfo
          peopleId={people?.id}
          name={people?.name}
          profilepic={people?.url}
        />
      ))}
    </div>
  );
}

export default Chat;
