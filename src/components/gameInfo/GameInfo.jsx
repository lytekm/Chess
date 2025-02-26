import React, { useState, useEffect } from "react";

// Optionally, a helper to format seconds into mm:ss
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const GameInfo = ({ gameState }) => {
  const [winner, setWinner] = useState(gameState.winner);
  const [moveHistory, setMoveHistory] = useState([...gameState.moveHistory]);
  const [turn, setTurn] = useState(gameState.getTurn());
  const [whiteTime, setWhiteTime] = useState(gameState.whiteTime);
  const [blackTime, setBlackTime] = useState(gameState.blackTime);
  const [capturedWhite, setCapturedWhite] = useState([
    ...gameState.capturedPieces.white,
  ]);
  const [capturedBlack, setCapturedBlack] = useState([
    ...gameState.capturedPieces.black,
  ]);

  // Poll for turn updates
  useEffect(() => {
    const updateTurn = () => {
      setTurn(gameState.getTurn());
    };
    const turnInterval = setInterval(updateTurn, 500);
    return () => clearInterval(turnInterval);
  }, [gameState]);

  // Poll for move history updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMoveHistory([...gameState.moveHistory]);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  // Poll for time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWhiteTime(gameState.whiteTime);
      setBlackTime(gameState.blackTime);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  // Poll for captured pieces updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCapturedWhite([...gameState.capturedPieces.white]);
      setCapturedBlack([...gameState.capturedPieces.black]);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  // Poll for winner updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWinner(gameState.winner);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <div className="game-info">
      <h2>Game Info</h2>
      <div className="turn-indicator">
        <strong>Turn:</strong> {turn.toUpperCase()}
      </div>
      <div className="timers">
        <div className="timer-section">
          <strong>White Time:</strong> {formatTime(whiteTime)}
        </div>
        <div className="timer-section">
          <strong>Black Time:</strong> {formatTime(blackTime)}
        </div>
      </div>
      <div className="captured-pieces">
        <div className="captured-section">
          <h3>White Captured Pieces:</h3>
          <div>
            {capturedWhite.length > 0
              ? capturedWhite.map((p, index) => (
                  <span key={index} style={{ marginRight: "5px" }}>
                    {p}
                  </span>
                ))
              : "None"}
          </div>
        </div>
        <div className="captured-section">
          <h3>Black Captured Pieces:</h3>
          <div>
            {capturedBlack.length > 0
              ? capturedBlack.map((p, index) => (
                  <span key={index} style={{ marginRight: "5px" }}>
                    {p}
                  </span>
                ))
              : "None"}
          </div>
        </div>
      </div>
      <div className="move-history">
        <h3>Move History</h3>
        <ol>
          {moveHistory.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ol>
      </div>
      {winner && (
        <div className="winner-notification">
          <h3>{winner.toUpperCase()} wins!</h3>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
