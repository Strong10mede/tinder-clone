import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import TinderCards from "./Components/TinderCards";
import SwipeButtons from "./Components/SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
function App() {
  return (
    <div className="app">
      <Header />
      {/* <TinderCards />
      <SwipeButtons /> */}
    </div>
  );
}

export default App;
