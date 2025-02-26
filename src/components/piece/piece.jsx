// File: ../piece/piece.js
function Piece() {
  // Piece types
  this.Pawn = 1;
  this.Knight = 2;
  this.Bishop = 3;
  this.Rook = 4;
  this.Queen = 5;
  this.King = 6;

  // Piece colors
  const White = 0;
  const Black = 16;

  // Correct piece images: white pieces get white symbols and black pieces get black symbols.
  const pieceImages = {
    [this.Pawn]: "♙", // White Pawn
    [this.Knight]: "♘", // White Knight
    [this.Bishop]: "♗", // White Bishop
    [this.Rook]: "♖", // White Rook
    [this.Queen]: "♕", // White Queen
    [this.King]: "♔", // White King
    [this.Pawn | Black]: "♟", // Black Pawn
    [this.Knight | Black]: "♞", // Black Knight
    [this.Bishop | Black]: "♝", // Black Bishop
    [this.Rook | Black]: "♜", // Black Rook
    [this.Queen | Black]: "♛", // Black Queen
    [this.King | Black]: "♚", // Black King
  };

  this.getPieceImage = (piece) => pieceImages[piece];

  // Define each piece with its color
  this.WhitePawn = this.Pawn | White;
  this.WhiteKnight = this.Knight | White;
  this.WhiteBishop = this.Bishop | White;
  this.WhiteRook = this.Rook | White;
  this.WhiteQueen = this.Queen | White;
  this.WhiteKing = this.King | White;

  this.BlackPawn = this.Pawn | Black;
  this.BlackKnight = this.Knight | Black;
  this.BlackBishop = this.Bishop | Black;
  this.BlackRook = this.Rook | Black;
  this.BlackQueen = this.Queen | Black;
  this.BlackKing = this.King | Black;
}

export default Piece;
