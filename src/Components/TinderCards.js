import React, { useState, useMemo, useRef, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { db } from "../firebase";
import "./TinderCards.css";
function TinderCards() {
  const [people, setPeople] = useState([]);

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
  useEffect(() => {
    db.collection("people")
      .get()
      .then((res) => setCurrentIndex(res.size - 1));
  }, []);

  const [currentIndex, setCurrentIndex] = useState();
  console.log(currentIndex);

  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  console.log(currentIndexRef.current, "hi");

  const childRefs = useMemo(
    () =>
      Array(3)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    console.log("updatecurrentindex");
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = currentIndex < 3 - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log("swiped");
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    console.log("swipe");
    if (canSwipe && currentIndex < people.length) {
      console.log("inside if swipe");
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    console.log("goback");
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    console.log("goback center");
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className="tinderCards__cardContainer">
        {people.map((people, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={people.name}
            onSwipe={(dir) => swiped(dir, people.name, index)}
            onCardLeftScreen={() => outOfFrame(people.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + people.url + ")" }}
              className="card"
            >
              <h3>{people.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default TinderCards;
