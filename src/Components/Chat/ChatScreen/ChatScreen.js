import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { useParams } from "react-router-dom";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { db } from "../../firebase";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";
function ChatScreen() {
  const { peopleId } = useParams();
  const [peopleDetails, setPeopleDetails] = useState(null);
  const [peopleMessages, setPeopleMessages] = useState([]);

  useEffect(() => {
    if (peopleId) {
      db.collection("rooms")
        .doc(peopleId)
        .onSnapshot((snapshot) => setPeopleDetails(snapshot.data()));
    }
    db.collection("rooms")
      .doc(peopleId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setPeopleMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [peopleId]);
  return (
    <div className="chatScreen">
      <div className="chatScreen__header">
        <div className="chatScreen__headerLeft">
          <h4 className="chatScreen__channelName">
            <strong>#{peopleDetails?.name} </strong>
            <StarBorderOutlineIcon />
          </h4>
        </div>
        <div className="chatScreen__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chatScreen__messages">
        {peopleMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
            key={timestamp}
          />
        ))}
      </div>
      <ChatInput channelName={peopleDetails?.name} channelId={peopleId} />
    </div>
  );
}

export default ChatScreen;
