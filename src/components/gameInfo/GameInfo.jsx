import React, { useState, useEffect, useContext } from "react";
import GameContext from "../contexts/GameContext";

// Helper to format seconds into mm:ss
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const GameInfo = ({ gameState }) => {
  const { player } = useContext(GameContext);
  const [winner, setWinner] = useState(gameState.winner);
  const [moveHistory, setMoveHistory] = useState([...gameState.moveHistory]);
  const [whiteTime, setWhiteTime] = useState(gameState.whiteTime);
  const [blackTime, setBlackTime] = useState(gameState.blackTime);
  const [turn, setTurn] = useState(gameState.getTurn());

  // Poll for updates (turn, move history, time, winner)
  useEffect(() => {
    const turnInterval = setInterval(() => {
      setTurn(gameState.getTurn());
    }, 500);
    return () => clearInterval(turnInterval);
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoveHistory([...gameState.moveHistory]);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWhiteTime(gameState.whiteTime);
      setBlackTime(gameState.blackTime);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinner(gameState.winner);
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  // Tick the clock every second (if game is active)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      if (!gameState.winner) {
        gameState.tick(); // Decrement the current player's time.
        setWhiteTime(gameState.whiteTime);
        setBlackTime(gameState.blackTime);
      }
    }, 1000);
    return () => clearInterval(tickInterval);
  }, [gameState]);

  // Group move history into rows of two moves: white then black.
  const groupedMoves = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    groupedMoves.push({
      white: moveHistory[i] || "",
      black: moveHistory[i + 1] || "",
    });
  }

  return (
    <div className="game-info">
      <div className="game-info-grid">
        <div className="left-column">
          {player.color === "white" ? (
            <>
              <div
                className={`timer-container black-timer ${
                  turn === "black" ? "active" : ""
                }`}
              >
                <div className="timer">{formatTime(blackTime)}</div>
              </div>
              <div
                className={`timer-container white-timer ${
                  turn === "white" ? "active" : ""
                }`}
              >
                <div className="player-info">
                  <h2>{player.username}</h2>
                </div>
                <div className="timer">{formatTime(whiteTime)}</div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`timer-container white-timer ${
                  turn === "white" ? "active" : ""
                }`}
              >
                <div className="timer">{formatTime(whiteTime)}</div>
              </div>
              <div
                className={`timer-container black-timer ${
                  turn === "black" ? "active" : ""
                }`}
              >
                <div className="player-info">
                  <h2>{player.username}</h2>
                </div>
                <div className="timer">{formatTime(blackTime)}</div>
              </div>
            </>
          )}
        </div>
        <div className="right-column">
          <h3>Move History</h3>
          <div className="move-history-list">
            {groupedMoves.map((pair, index) => (
              <div key={index} className="move-row">
                <div className="move-item white-move">{pair.white}</div>
                <div className="move-item black-move">{pair.black}</div>
              </div>
            ))}
          </div>
        </div>
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
