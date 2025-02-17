import createSnake from "./createSnake.js";
import gameLoop from "./gameLoop.js";
import initGame from "./initGame.js";

document.addEventListener("DOMContentLoaded", () => {
  initGame();
  createSnake();
  gameLoop(0);
});
