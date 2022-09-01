import TinderCards from "./Components/TinderCards";
import "./App.css";
import SwipeButtons from "./Components/SwipeButtons";
import Header from "./Components/Header";
function App() {
  return (
    <div className="app">
      <Header />
      <TinderCards />
      <SwipeButtons />
    </div>
  );
}

export default App;
