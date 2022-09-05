import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import { db } from "../firebase";

function TinderCards() {
  const [people, setPeople] = useState([]);
  const [swipe, setSwipe] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("people")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    setSwipe(direction);
  };

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            onSwipe={onSwipe}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
        {swipe && <h2 className="swipe__results">You Swiped {swipe}</h2>}
      </div>
    </div>
  );
}

export default TinderCards;
