import { game, generateColorCell } from "./gameLogic.js";
import { moveSnake, createSnake } from "./snakeMovement.js";
import { displaySnake } from "./display.js";

function gameLoop(timestamp) {
  if (game.isPaused || game.isGameOver) return;

  const delta = timestamp - game.lastTime;
  if (delta > game.snakeSpeed) {
    moveSnake();
    displaySnake();
    game.lastTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener("DOMContentLoaded", () => {
  createSnake();
  gameLoop(0);
  game.colorGenerationInterval = setInterval(generateColorCell, 5000);
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    game.isPaused = !game.isPaused;

    document.getElementById("pause-alert").style.display = game.isPaused
      ? "block"
      : "none";
    document.getElementById("overlay").style.display = game.isPaused
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
