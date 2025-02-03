import React, { useState, useEffect } from "react";
import "./App.css";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E67E22",
  "#2ECC71",
  "#E74C3C",
  "#F1C40F",
];

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState({ message: "", type: "" });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateColors = () => {
    let shuffled = [...COLORS].sort(() => 0.5 - Math.random()).slice(0, 5);
    let randomColor = getRandomColor();
    shuffled.push(randomColor); // Ensure a unique color in the mix
    shuffled = shuffled.sort(() => 0.5 - Math.random()); // Shuffle again

    setOptions(shuffled);
    setTargetColor(shuffled[Math.floor(Math.random() * shuffled.length)]);
    setGameStatus({ message: "", type: "" });
  };

  useEffect(() => {
    generateColors();
  }, []);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus({ message: "Correct! Well done!", type: "success" });
      setTimeout(generateColors, 1000);
    } else {
      setGameStatus({ message: "Wrong guess! Try again!", type: "error" });
    }
  };

  const startNewGame = () => {
    setScore(0);
    generateColors();
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h1>Color Guessing Game</h1>

        <div data-testid="gameInstructions" className="instructions">
          Guess the correct color from the options below!
        </div>

        <div
          data-testid="colorBox"
          className="color-box"
          style={{ backgroundColor: targetColor }}
        />

        <div data-testid="score" className="score">
          Score: {score}
        </div>

        {gameStatus.message && (
          <div data-testid="gameStatus" className={`status ${gameStatus.type}`}>
            {gameStatus.message}
          </div>
        )}

        <div className="color-options">
          {options.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            />
          ))}
        </div>

        <button
          data-testid="newGameButton"
          className="new-game-button"
          onClick={startNewGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;
