import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameState from "../board/gameState";
import "../../assests/main.css";

const timeOptions = [
  { label: "1 minute", time: 60, increment: 0 },
  { label: "1 + 5 seconds", time: 60, increment: 5 },
  { label: "5 minutes", time: 300, increment: 0 },
  { label: "5 + 10 seconds", time: 300, increment: 10 },
  { label: "10 minutes", time: 600, increment: 0 },
  { label: "15 minutes", time: 900, increment: 0 },
  { label: "1 hour and 30 minutes", time: 5400, increment: 0 },
];

const HomePage = ({ setGameState }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(timeOptions[0]);

  const handleStartGame = () => {
    // Create a new GameState instance.
    const newGameState = new GameState();
    // Set time controls.
    newGameState.setTimeControl(selectedOption.time);
    newGameState.setTimeIncrement(selectedOption.increment);
    // Store it in App state.
    setGameState(newGameState);
    // Navigate to the game page.
    navigate("/game");
  };

  return (
    <div className="homepage">
      <h1>Welcome to Chess</h1>
      <div className="settings">
        <label htmlFor="timeSelect">Time Controls:</label>
        <select
          id="timeSelect"
          value={selectedOption.label}
          onChange={(e) =>
            setSelectedOption(
              timeOptions.find((option) => option.label === e.target.value)
            )
          }
        >
          {timeOptions.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default HomePage;
