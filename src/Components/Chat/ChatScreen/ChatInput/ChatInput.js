import React, { useState } from "react";
import { useStateValue } from "../../../../StateLayer";
import { db } from "../../../../firebase";
import firebase from "firebase";
import "./ChatInput.css";
function ChatInput({ peopleName, peopleId }) {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (!input) return false;

    if (peopleId) {
      db.collection("people").doc(peopleId).collection("chat").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
      });
    }
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Send a message to # ${peopleName}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
