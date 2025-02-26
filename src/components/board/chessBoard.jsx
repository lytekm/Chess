import React, { useState, useEffect, useContext } from "react";
import "../../assests/board.css";
import "../../assests/piece.css";
import Square from "./Square";
import GameContext from "../contexts/GameContext";

const ChessBoard = ({ gameState }) => {
  const { player } = useContext(GameContext);
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
    if (selectedSquare && selectedSquare.squareID === squareID) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }
    if (selectedSquare && legalMoves.includes(squareID)) {
      const moveMade = gameState.makeMove(selectedSquare.squareID, squareID);
      if (moveMade) {
        setCurrentPosition({ ...gameState.getCurrentPosition() });
      }
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }
    const piece = gameState.getPiece(squareID);
    if (
      piece &&
      gameState.getTurn() === (piece & 0b10000 ? "black" : "white")
    ) {
      setSelectedSquare({ row, col, squareID });
      setLegalMoves(gameState.generateLegalMoves(squareID));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const renderBoard = () => {
    const board = [];
    // Determine row iteration order based on player's color.
    const rowIndices =
      player.color === "white"
        ? [...Array(8).keys()].reverse()
        : [...Array(8).keys()];
    for (let row of rowIndices) {
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
