import Piece from "../piece/piece";

function GameState() {
  const piece = new Piece();

  this.selectedSquare = [-1, -1];
  this.setSelectedSquare = (row, column) => {
    this.selectedSquare = [row, column];
  };

  this.getSelectedSquare = () => {
    return this.selectedSquare;
  };

  this.startingPosition = {
    A8: piece.BlackRook,
    B8: piece.BlackKnight,
    C8: piece.BlackBishop,
    D8: piece.BlackQueen,
    E8: piece.BlackKing,
    F8: piece.BlackBishop,
    G8: piece.BlackKnight,
    H8: piece.BlackRook,
    A7: piece.BlackPawn,
    B7: piece.BlackPawn,
    C7: piece.BlackPawn,
    D7: piece.BlackPawn,
    E7: piece.BlackPawn,
    F7: piece.BlackPawn,
    G7: piece.BlackPawn,
    H7: piece.BlackPawn,
    A2: piece.WhitePawn,
    B2: piece.WhitePawn,
    C2: piece.WhitePawn,
    D2: piece.WhitePawn,
    E2: piece.WhitePawn,
    F2: piece.WhitePawn,
    G2: piece.WhitePawn,
    H2: piece.WhitePawn,
    A1: piece.WhiteRook,
    B1: piece.WhiteKnight,
    C1: piece.WhiteBishop,
    D1: piece.WhiteQueen,
    E1: piece.WhiteKing,
    F1: piece.WhiteBishop,
    G1: piece.WhiteKnight,
    H1: piece.WhiteRook,
  };

  this.currentPosition = this.startingPosition;

  this.getCurrentPosition = () => {
    return this.currentPosition;
  };

  this.setCurrentPosition = (newPosition) => {
    this.currentPosition = newPosition;
  };

  this.getStartingPosition = () => {
    return this.startingPosition;
  };
}

export default GameState;
