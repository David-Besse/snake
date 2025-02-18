import game from "./game.js";
import generateColorCell from "./generateColorCell.js";
import gameLoop from "./gameLoop.js";
import { loadHighScores, displayHighScores } from "./displayScore.js";

export default function initGame() {
    game.snakeContainer = document.querySelector(".snake-container");
  
    loadHighScores();
    displayHighScores();
  
    game.colorGenerationInterval = setInterval(generateColorCell, 5000);
  
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        game.isPaused = !game.isPaused;
  
        document.getElementById("pause-alert").style.display = game.isPaused
          ? "block"
          : "none";
  
        clearInterval(game.gameInterval);
        clearInterval(game.colorGenerationInterval);
  
        if (!game.isPaused) {
          gameLoop(0);
          game.colorGenerationInterval = setInterval(generateColorCell, 5000);
        }
      } else {
        const directions = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right",
        };
        if (directions[event.key]) game.snakeDirection = directions[event.key];
      }
    });
  }