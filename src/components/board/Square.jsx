import React from "react";
import Piece from "../piece/piece";

const Square = ({
  row,
  col,
  pieceName,
  isSelected,
  isLegalMove,
  handleClick,
}) => {
  const squareColor = (row + col) % 2 !== 0 ? "lightSquare" : "darkSquare";
  const piece = new Piece();

  return (
    <div
      className={`square ${squareColor} ${isSelected ? "selected" : ""} ${
        isLegalMove ? "legalMove" : ""
      }`}
      onClick={handleClick}
    >
      <p className="piece">{piece.getPieceImage(pieceName)}</p>
      {/* Show file label (letter) on the first row */}
      {row === 0 && (
        <div className="fileLabel">{String.fromCharCode(65 + col)}</div>
      )}
      {/* Show rank label (number) on the first column */}
      {col === 0 && <div className="rankLabel">{row + 1}</div>}
    </div>
  );
};

export default Square;
