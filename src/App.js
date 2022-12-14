import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import TinderCards from "./Components/TinderCards/TinderCards";

import Chat from "./Components/Chat/Chat";
import ChatScreen from "./Components/Chat/ChatScreen/ChatScreen";
import { useStateValue } from "./StateLayer";
import Login from "./Components/Login/Login";
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/chat/:peopleId">
              <Header backButton="/chat" />
              <ChatScreen />
            </Route>
            <Route path="/chat">
              <Header backButton="/" />
              <Chat />
            </Route>
            <Route path="/">
              <Header />
              <TinderCards />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
