// File: gameState.js
import Piece from "../piece/piece";

class GameState {
  constructor() {
    this.piece = new Piece();
    this.currentPosition = this.getStartingPosition();
    this.turn = "white"; // White goes first
    this.moveHistory = []; // Store moves in algebraic notation

    // Castling rights tracking
    this.hasKingMoved = { white: false, black: false };
    this.hasRookMoved = {
      white: { A1: false, H1: false },
      black: { A8: false, H8: false },
    };

    // Time controls (in seconds)
    // Defaults (e.g., 5 minutes each)
    this.whiteTime = 300;
    this.blackTime = 300;
    // Time increment per move (in seconds)
    this.timeIncrement = 0; // Default to 0; can be set from UI

    // Captured pieces lists:
    // For each side, store the pieces lost.
    // (e.g., if white captures a black piece, add that piece to black's lost list)
    this.capturedPieces = {
      white: [],
      black: [],
    };

    // Winner (null if game continues)
    this.winner = null;
  }

  // Allow UI to set time controls:
  setTimeControl(timeInSeconds) {
    this.whiteTime = timeInSeconds;
    this.blackTime = timeInSeconds;
  }
  setTimeIncrement(incrementInSeconds) {
    this.timeIncrement = incrementInSeconds;
  }

  getStartingPosition() {
    return {
      A8: this.piece.BlackRook,
      B8: this.piece.BlackKnight,
      C8: this.piece.BlackBishop,
      D8: this.piece.BlackQueen,
      E8: this.piece.BlackKing,
      F8: this.piece.BlackBishop,
      G8: this.piece.BlackKnight,
      H8: this.piece.BlackRook,
      A7: this.piece.BlackPawn,
      B7: this.piece.BlackPawn,
      C7: this.piece.BlackPawn,
      D7: this.piece.BlackPawn,
      E7: this.piece.BlackPawn,
      F7: this.piece.BlackPawn,
      G7: this.piece.BlackPawn,
      H7: this.piece.BlackPawn,
      A2: this.piece.WhitePawn,
      B2: this.piece.WhitePawn,
      C2: this.piece.WhitePawn,
      D2: this.piece.WhitePawn,
      E2: this.piece.WhitePawn,
      F2: this.piece.WhitePawn,
      G2: this.piece.WhitePawn,
      H2: this.piece.WhitePawn,
      A1: this.piece.WhiteRook,
      B1: this.piece.WhiteKnight,
      C1: this.piece.WhiteBishop,
      D1: this.piece.WhiteQueen,
      E1: this.piece.WhiteKing,
      F1: this.piece.WhiteBishop,
      G1: this.piece.WhiteKnight,
      H1: this.piece.WhiteRook,
    };
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  setCurrentPosition(newPosition) {
    this.currentPosition = newPosition;
  }

  switchTurn() {
    this.turn = this.turn === "white" ? "black" : "white";
  }

  getTurn() {
    return this.turn;
  }

  getPiece(squareID, board = this.currentPosition) {
    return board[squareID];
  }

  isMoveLegal(startSquare, endSquare) {
    const piece = this.getPiece(startSquare);
    if (!piece) return false;
    const legalMoves = this.generateLegalMoves(startSquare);
    return legalMoves.includes(endSquare);
  }

  /**
   * Returns all pseudo-legal moves for a piece on the given square.
   * These moves do not check for king safety.
   */
  getPseudoLegalMoves(squareID, board = this.currentPosition) {
    const piece = board[squareID];
    if (!piece) return [];
    console.log(`Generating pseudo-legal moves for ${squareID}`);
    let moves = [];
    const pieceType = piece & 0b1111;
    const pieceColor = piece & 0b10000 ? "black" : "white";
    const toSquare = (col, row) => `${String.fromCharCode(col)}${row}`;

    if (pieceType === this.piece.Pawn) {
      const direction = pieceColor === "white" ? 1 : -1;
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const forwardSquare = toSquare(col, row + direction);
      if (!board[forwardSquare]) {
        moves.push(forwardSquare);
        const startingRow = pieceColor === "white" ? 2 : 7;
        const twoForward = toSquare(col, row + 2 * direction);
        if (row === startingRow && !board[twoForward]) {
          moves.push(twoForward);
        }
      }
      [-1, 1].forEach((offset) => {
        const targetSquare = toSquare(col + offset, row + direction);
        if (board[targetSquare]) {
          const targetPiece = board[targetSquare];
          const targetColor = targetPiece & 0b10000 ? "black" : "white";
          if (targetColor !== pieceColor) {
            moves.push(targetSquare);
          }
        }
      });
    } else if (pieceType === this.piece.Knight) {
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const knightMoves = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
      ];
      knightMoves.forEach(([dx, dy]) => {
        const newCol = col + dx;
        const newRow = row + dy;
        if (newCol >= 65 && newCol <= 72 && newRow >= 1 && newRow <= 8) {
          const targetSquare = toSquare(newCol, newRow);
          const targetPiece = board[targetSquare];
          if (!targetPiece) {
            moves.push(targetSquare);
          } else {
            const targetColor = targetPiece & 0b10000 ? "black" : "white";
            if (targetColor !== pieceColor) {
              moves.push(targetSquare);
            }
          }
        }
      });
    } else if (pieceType === this.piece.Bishop) {
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const directions = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      directions.forEach(([dx, dy]) => {
        let step = 1;
        while (true) {
          const newCol = col + dx * step;
          const newRow = row + dy * step;
          if (newCol < 65 || newCol > 72 || newRow < 1 || newRow > 8) break;
          const targetSquare = toSquare(newCol, newRow);
          const targetPiece = board[targetSquare];
          if (!targetPiece) {
            moves.push(targetSquare);
          } else {
            const targetColor = targetPiece & 0b10000 ? "black" : "white";
            if (targetColor !== pieceColor) {
              moves.push(targetSquare);
            }
            break;
          }
          step++;
        }
      });
    } else if (pieceType === this.piece.Rook) {
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      directions.forEach(([dx, dy]) => {
        let step = 1;
        while (true) {
          const newCol = col + dx * step;
          const newRow = row + dy * step;
          if (newCol < 65 || newCol > 72 || newRow < 1 || newRow > 8) break;
          const targetSquare = toSquare(newCol, newRow);
          const targetPiece = board[targetSquare];
          if (!targetPiece) {
            moves.push(targetSquare);
          } else {
            const targetColor = targetPiece & 0b10000 ? "black" : "white";
            if (targetColor !== pieceColor) {
              moves.push(targetSquare);
            }
            break;
          }
          step++;
        }
      });
    } else if (pieceType === this.piece.Queen) {
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const directions = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      directions.forEach(([dx, dy]) => {
        let step = 1;
        while (true) {
          const newCol = col + dx * step;
          const newRow = row + dy * step;
          if (newCol < 65 || newCol > 72 || newRow < 1 || newRow > 8) break;
          const targetSquare = toSquare(newCol, newRow);
          const targetPiece = board[targetSquare];
          if (!targetPiece) {
            moves.push(targetSquare);
          } else {
            const targetColor = targetPiece & 0b10000 ? "black" : "white";
            if (targetColor !== pieceColor) {
              moves.push(targetSquare);
            }
            break;
          }
          step++;
        }
      });
    } else if (pieceType === this.piece.King) {
      const row = parseInt(squareID[1], 10);
      const col = squareID.charCodeAt(0);
      const directions = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
      directions.forEach(([dx, dy]) => {
        const newCol = col + dx;
        const newRow = row + dy;
        if (newCol >= 65 && newCol <= 72 && newRow >= 1 && newRow <= 8) {
          const targetSquare = toSquare(newCol, newRow);
          const targetPiece = board[targetSquare];
          if (!targetPiece) {
            moves.push(targetSquare);
          } else {
            const targetColor = targetPiece & 0b10000 ? "black" : "white";
            if (targetColor !== pieceColor) {
              moves.push(targetSquare);
            }
          }
        }
      });
      // Castling moves:
      if (!this.hasKingMoved[pieceColor]) {
        if (pieceColor === "white") {
          // King-side: E1 -> G1; squares F1 and G1 must be empty,
          // and E1, F1, G1 not attacked.
          if (
            !board["F1"] &&
            !board["G1"] &&
            !this.hasRookMoved.white["H1"] &&
            !this.isSquareAttacked("E1", "black") &&
            !this.isSquareAttacked("F1", "black") &&
            !this.isSquareAttacked("G1", "black")
          ) {
            moves.push("G1");
          }
          // Queen-side: E1 -> C1; squares D1, C1, and B1 must be empty,
          // and E1, D1, C1 not attacked.
          if (
            !board["D1"] &&
            !board["C1"] &&
            !board["B1"] &&
            !this.hasRookMoved.white["A1"] &&
            !this.isSquareAttacked("E1", "black") &&
            !this.isSquareAttacked("D1", "black") &&
            !this.isSquareAttacked("C1", "black")
          ) {
            moves.push("C1");
          }
        } else {
          // King-side: E8 -> G8; squares F8 and G8 must be empty,
          // and E8, F8, G8 not attacked.
          if (
            !board["F8"] &&
            !board["G8"] &&
            !this.hasRookMoved.black["H8"] &&
            !this.isSquareAttacked("E8", "white") &&
            !this.isSquareAttacked("F8", "white") &&
            !this.isSquareAttacked("G8", "white")
          ) {
            moves.push("G8");
          }
          // Queen-side: E8 -> C8; squares D8, C8, and B8 must be empty,
          // and E8, D8, C8 not attacked.
          if (
            !board["D8"] &&
            !board["C8"] &&
            !board["B8"] &&
            !this.hasRookMoved.black["A8"] &&
            !this.isSquareAttacked("E8", "white") &&
            !this.isSquareAttacked("D8", "white") &&
            !this.isSquareAttacked("C8", "white")
          ) {
            moves.push("C8");
          }
        }
      }
    }
    return moves;
  }

  generateLegalMoves(squareID, board = this.currentPosition, simulate = false) {
    const pseudoMoves = this.getPseudoLegalMoves(squareID, board);
    if (simulate) {
      return pseudoMoves;
    }
    return pseudoMoves.filter(
      (move) => !this.wouldMovePutKingInCheck(squareID, move)
    );
  }

  wouldMovePutKingInCheck(startSquare, endSquare) {
    const simulatedPosition = { ...this.currentPosition };
    simulatedPosition[endSquare] = simulatedPosition[startSquare];
    delete simulatedPosition[startSquare];
    return this.isKingInCheck(this.turn, simulatedPosition);
  }

  isKingInCheck(turn, board = this.currentPosition) {
    const kingPiece =
      turn === "white" ? this.piece.WhiteKing : this.piece.BlackKing;
    const kingPosition = Object.keys(board).find(
      (key) => board[key] === kingPiece
    );
    const opponentColor = turn === "white" ? "black" : "white";
    return Object.keys(board).some((squareID) => {
      const piece = board[squareID];
      if (piece && (piece & 0b10000 ? "black" : "white") === opponentColor) {
        const moves = this.generateLegalMoves(squareID, board, true);
        return moves.includes(kingPosition);
      }
      return false;
    });
  }

  hasAnyLegalMove(turn, board = this.currentPosition) {
    for (const square in board) {
      const piece = board[square];
      if (piece && (piece & 0b10000 ? "black" : "white") === turn) {
        const moves = this.generateLegalMoves(square, board, false);
        if (moves.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  getWinner() {
    // Check for time expiration:
    if (this.whiteTime <= 0) return "black";
    if (this.blackTime <= 0) return "white";
    // Otherwise, check if current side has no legal moves.
    if (!this.hasAnyLegalMove(this.turn)) {
      return this.turn === "white" ? "black" : "white";
    }
    return null;
  }

  moveToNotation(endSquare, piece, capturedPiece = null) {
    const pieceType = piece & 0b1111;
    const pieceLetterMap = {
      [this.piece.Pawn]: "",
      [this.piece.Knight]: "N",
      [this.piece.Bishop]: "B",
      [this.piece.Rook]: "R",
      [this.piece.Queen]: "Q",
      [this.piece.King]: "K",
    };
    const letter = pieceLetterMap[pieceType] || "";
    const captureIndicator = capturedPiece ? "x" : "";
    return `${letter}${captureIndicator}${endSquare}`;
  }

  makeMove(startSquare, endSquare) {
    if (!this.isMoveLegal(startSquare, endSquare)) {
      return false;
    }

    // Check for capture BEFORE making the move.
    const capturedPiece = this.currentPosition[endSquare] || null;

    const newPosition = { ...this.currentPosition };

    // Handle castling: if king moves to a castling square, move the rook.
    const piece = newPosition[startSquare];
    const pieceType = piece & 0b1111;
    let notation = "";
    if (
      pieceType === this.piece.King &&
      (endSquare === "G1" ||
        endSquare === "C1" ||
        endSquare === "G8" ||
        endSquare === "C8")
    ) {
      // Determine castling type.
      if (endSquare === "G1" || endSquare === "G8") {
        notation = "O-O";
      } else if (endSquare === "C1" || endSquare === "C8") {
        notation = "O-O-O";
      }
      // Move the rook as part of castling.
      if (endSquare === "G1") {
        newPosition["F1"] = newPosition["H1"];
        delete newPosition["H1"];
        this.hasRookMoved.white["H1"] = true;
      } else if (endSquare === "C1") {
        newPosition["D1"] = newPosition["A1"];
        delete newPosition["A1"];
        this.hasRookMoved.white["A1"] = true;
      } else if (endSquare === "G8") {
        newPosition["F8"] = newPosition["H8"];
        delete newPosition["H8"];
        this.hasRookMoved.black["H8"] = true;
      } else if (endSquare === "C8") {
        newPosition["D8"] = newPosition["A8"];
        delete newPosition["A8"];
        this.hasRookMoved.black["A8"] = true;
      }
    }

    // Move the piece.
    newPosition[endSquare] = newPosition[startSquare];
    delete newPosition[startSquare];
    this.currentPosition = newPosition;

    // If it's not a castling move, generate standard notation.
    if (!notation) {
      notation = this.moveToNotation(endSquare, piece, capturedPiece);
    }
    this.moveHistory.push(notation);

    // If a capture occurred, record it.
    if (capturedPiece) {
      const movingColor = this.turn;
      const opponentColor = movingColor === "white" ? "black" : "white";
      this.capturedPieces[opponentColor].push(capturedPiece);
    }

    // Update castling rights.
    if (pieceType === this.piece.King) {
      this.hasKingMoved[piece & 0b10000 ? "black" : "white"] = true;
    }
    if (pieceType === this.piece.Rook) {
      if (startSquare === "A1" || startSquare === "H1") {
        this.hasRookMoved.white[startSquare] = true;
      } else if (startSquare === "A8" || startSquare === "H8") {
        this.hasRookMoved.black[startSquare] = true;
      }
    }

    // Add time increment and switch turn, then update winner.
    if (this.turn === "white") {
      this.whiteTime += this.timeIncrement;
    } else {
      this.blackTime += this.timeIncrement;
    }

    this.switchTurn();
    this.winner = this.getWinner();

    return true;
  }

  /**
   * Called every second by the UI to decrement the clock for the current turn.
   */
  tick() {
    if (this.turn === "white") {
      this.whiteTime--;
      if (this.whiteTime <= 0) {
        this.winner = "black";
      }
    } else {
      this.blackTime--;
      if (this.blackTime <= 0) {
        this.winner = "white";
      }
    }
  }
  isSquareAttacked(square, attackerColor, board = this.currentPosition) {
    for (const sq in board) {
      const piece = board[sq];
      if (piece && (piece & 0b10000 ? "black" : "white") === attackerColor) {
        const moves = this.getPseudoLegalMoves(sq, board);
        if (moves.includes(square)) {
          return true;
        }
      }
    }
    return false;
  }
}

export default GameState;
