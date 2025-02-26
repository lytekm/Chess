import React from "react";
import ChessBoard from "../board/chessBoard";
import GameInfo from "../gameInfo/GameInfo";
import "../../assests/board.css";
import "../../assests/piece.css";
import "../../assests/main.css";
import "../../assests/game-info.css";

const GamePage = ({ gameState }) => {
  if (!gameState) {
    return <div>Loading game...</div>;
  }

  return (
    <div className="game-container">
      <ChessBoard gameState={gameState} />
      <GameInfo gameState={gameState} />
    </div>
  );
};

export default GamePage;
