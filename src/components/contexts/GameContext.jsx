// GameContext.js
import React, { createContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Default player info
  const [player, setPlayer] = useState({
    username: "Kevin",
    color: "black",
  });

  return (
    <GameContext.Provider value={{ player, setPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
