import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import TinderCards from "./Components/TinderCards";
import SwipeButtons from "./Components/SwipeButtons";
import Chats from "./Components/Chats";
import ChatScreen from "./Components/ChatScreen";
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat" />
            {/* <ChatScreen /> */}
          </Route>
          <Route path="/chat">
            <Header backButton="/" />
            {/* <Chats /> */}
          </Route>
          <Route path="/">
            <Header />
            <TinderCards />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
