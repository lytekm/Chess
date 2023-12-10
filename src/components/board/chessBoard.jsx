import React, { useState } from "react";
import "../../assests/board.css"; // Create a CSS file for styling
import "../../assests/piece.css"; // Create a CSS file for styling
import GameState from "./gameState";
import Piece from "../piece/piece";

const ChessBoard = () => {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const State = new GameState();
  const piece = new Piece();

  const [currentPosition, setCurrentPosition] = useState(
    State.getCurrentPosition()
  );

  const squareTitles = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
  };

  const squareHasPiece = (squareID) => {
    return currentPosition[squareID] !== undefined;
  };

  const handleSquareClick = (row, col, squareID) => {
    const selectedSquareID = selectedSquare
      ? `${squareTitles[selectedSquare.col]}${selectedSquare.row + 1}`
      : null;
    if (
      selectedSquare &&
      selectedSquare.row === row &&
      selectedSquare.col === col
    ) {
      // Clicked on the already selected square, unselect it
      setSelectedSquare(null);
    } else if (squareHasPiece(selectedSquareID)) {
      // if the square has a piece, move the piece to the selected square
      const newPosition = { ...currentPosition };
      newPosition[squareID] = newPosition[selectedSquareID];
      delete newPosition[selectedSquareID];
      setCurrentPosition(newPosition);
      setSelectedSquare(null);
    } else {
      // if no square is selected, select the square
      setSelectedSquare({ row, col });
    }
  };

  const isSquareSelected = (row, col) => {
    return (
      selectedSquare && selectedSquare.row === row && selectedSquare.col === col
    );
  };

  const renderBoard = () => {
    const board = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareColor =
          (row + col) % 2 === 0 ? "lightSquare" : "darkSquare";
        const isSelected = isSquareSelected(row, col);
        const squareID = `${squareTitles[col]}${row + 1}`;
        const pieceName = currentPosition[squareID];

        board.push(
          <div
            key={`${row}-${col}`}
            className={`square ${squareColor} ${isSelected ? "selected" : ""}`}
            onClick={() => handleSquareClick(row, col, squareID)}
          >
            {/* Render chess pieces or other content here if needed */}
            <p className="piece">{piece.getPieceImage(pieceName)}</p>
          </div>
        );
      }
    }

    return board;
  };

  return <div className="chess-board">{renderBoard()}</div>;
};

export default ChessBoard;
