import React, { useState, useEffect } from "react";
import "../../assests/board.css";
import "../../assests/piece.css";
import Square from "./Square";

const ChessBoard = ({ gameState }) => {
  const [currentPosition, setCurrentPosition] = useState(
    gameState.getCurrentPosition()
  );
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

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

  useEffect(() => {
    gameState.setCurrentPosition(currentPosition);
  }, [currentPosition, gameState]);

  const handleSquareClick = (row, col, squareID) => {
    // If clicking the same square, deselect
    if (selectedSquare && selectedSquare.squareID === squareID) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // If a square is already selected and the clicked square is a legal move
    if (selectedSquare && legalMoves.includes(squareID)) {
      // Use the GameState's makeMove method so that castling logic is executed.
      const moveMade = gameState.makeMove(selectedSquare.squareID, squareID);
      if (moveMade) {
        setCurrentPosition({ ...gameState.getCurrentPosition() });
      }
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // If no square is selected, check if clicked square has a piece belonging to current turn
    const piece = gameState.getPiece(squareID);
    if (
      piece &&
      gameState.getTurn() === (piece & 0b10000 ? "black" : "white")
    ) {
      // Set the square as selected and generate legal moves
      setSelectedSquare({ row, col, squareID });
      setLegalMoves(gameState.generateLegalMoves(squareID));
    } else {
      // If clicked square is not selectable, clear any selection
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const renderBoard = () => {
    const board = [];
    // Iterate rows in reverse order
    for (let row = 7; row >= 0; row--) {
      for (let col = 0; col < 8; col++) {
        const squareID = `${squareTitles[col]}${row + 1}`;
        const pieceName = currentPosition[squareID];
        const isSelected = selectedSquare?.squareID === squareID;
        const isLegalMove = legalMoves.includes(squareID);
        board.push(
          <Square
            key={`${row}-${col}`}
            row={row}
            col={col}
            pieceName={pieceName}
            isSelected={isSelected}
            isLegalMove={isLegalMove}
            handleClick={() => handleSquareClick(row, col, squareID)}
          />
        );
      }
    }
    return board;
  };

  return <div className="chess-board">{renderBoard()}</div>;
};

export default ChessBoard;
