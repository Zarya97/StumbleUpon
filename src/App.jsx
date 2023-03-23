import { useState } from "react";
import "./App.css";
import Card from "./components/cards";
import HistorySidebar from "./components/visitedBar";
import BanSidebar from "./components/banList";

function App() {
  const [visitedDogs, setVisitedDogs] = useState([]);
  const [bannedTemperaments, setBannedTemperaments] = useState([]);

  return (
    <div className="App">
      <HistorySidebar visitedDogs={visitedDogs} />

      <Card
        visitedDogs={visitedDogs}
        setVisitedDogs={setVisitedDogs}
        bannedTemperaments={bannedTemperaments}
        setBannedTemperaments={setBannedTemperaments}
      />
      

      <BanSidebar bannedTemperaments={bannedTemperaments} setBannedTemperaments={setBannedTemperaments} />
    </div>
  );
}

export default App;