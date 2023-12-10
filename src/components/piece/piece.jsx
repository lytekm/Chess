function Piece() {
  // piece types
  const None = 0;
  const Pawn = 1;
  const Knight = 2;
  const Bishop = 3;
  const Rook = 4;
  const Queen = 5;
  const King = 6;
  // piece colors
  const White = 0;
  const Black = 16;

  const pieceImages = {
    1: "♟",
    2: "♞",
    3: "♝",
    4: "♜",
    5: "♛",
    6: "♚",
    17: "♙",
    18: "♘",
    19: "♗",
    20: "♖",
    21: "♕",
    22: "♔",
  };

  this.getPieceImage = (piece) => {
    return pieceImages[piece];
  };

  // Pieces
  this.WhitePawn = Pawn | White; // 1
  this.WhiteKnight = Knight | White; // 2
  this.WhiteBishop = Bishop | White; // 3
  this.WhiteRook = Rook | White; // 4
  this.WhiteQueen = Queen | White; // 5
  this.WhiteKing = King | White; // 6
  this.BlackPawn = Pawn | Black; // 9
  this.BlackKnight = Knight | Black; // 10
  this.BlackBishop = Bishop | Black; // 11
  this.BlackRook = Rook | Black; // 12
  this.BlackQueen = Queen | Black; // 13
  this.BlackKing = King | Black; // 14
}

export default Piece;
