import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/homepage/homepage";
import GamePage from "./components/gamepage/GamePage";
import { GameProvider } from "./components/contexts/GameContext";
import "./assests/board.css";
import "./assests/main.css";
import "./assests/game-info.css";

const App = () => {
  // We can still manage the game state at this level if needed.
  const [gameState, setGameState] = useState(null);

  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setGameState={setGameState} />} />
          <Route path="/game" element={<GamePage gameState={gameState} />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
