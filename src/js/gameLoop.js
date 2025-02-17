import game from "./game.js";
import moveSnake from "./moveSnake.js";
import displaySnake from "./displaySnake.js";
import { displayScore } from "./displayScore.js";

export default function gameLoop(timestamp) {
  if (game.isPaused || game.isGameOver) return;

  const delta = timestamp - game.lastTime;
  if (delta > game.snakeSpeed) {
    moveSnake();
    displaySnake();
    displayScore();
    game.lastTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}
