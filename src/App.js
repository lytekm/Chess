import React from "react";
import ChessBoard from "./components/board/chessBoard";
import GameInfo from "./components/gameInfo/GameInfo";
import GameState from "./components/board/gameState";
import "./assests/board.css";
import "./assests/main.css";
import "./assests/game-info.css";

const App = () => {
  // Create a GameState instance and pass it down to both ChessBoard and GameInfo.
  // Alternatively, manage GameState at a higher level and pass props to both.
  const [gameState] = React.useState(new GameState());

  return (
    <div className="game-container">
      <ChessBoard gameState={gameState} />
      <GameInfo gameState={gameState} />
    </div>
  );
};

export default App;
