import game from "./game.js";
import checkWallCollision from "./checkWallCollision.js";
import resetGame from "./resetGame.js";
import gameOver from "./gameOver.js";
import growSnake from "./growSnake.js";
import { displayScore } from "./displayScore.js";

export default function moveSnake() {
  for (let i = game.snakeSegments.length - 1; i > 0; i--) {
    game.snakeSegments[i].style.left = game.snakeSegments[i - 1].style.left;
    game.snakeSegments[i].style.top = game.snakeSegments[i - 1].style.top;
  }

  switch (game.snakeDirection) {
    case "right":
      game.snakePosition.x += 10;
      break;
    case "left":
      game.snakePosition.x -= 10;
      break;
    case "up":
      game.snakePosition.y -= 10;
      break;
    case "down":
      game.snakePosition.y += 10;
      break;
  }

  const headX = game.snakePosition.x;
  const headY = game.snakePosition.y;

  game.colorCells.forEach((cell, index) => {
    if (headX === cell.x * 10 && headY === cell.y * 10) {
      game.colorCells.splice(index, 1);

      const cellElement = document.getElementById(cell.id);

      if (cellElement) {
        console.log("Removing color cell:", cellElement.id);
        cellElement.remove();
      } else {
        console.log("Color cell not found:", cell.id);
      }

      game.snakeLength++;
      game.score += 10;
      growSnake();

      displayScore();

      if (game.snakeSpeed > 50) game.snakeSpeed -= 10;
    }
  });

  if (checkWallCollision()) {
    clearInterval(game.gameInterval);
    clearInterval(game.colorGenerationInterval);
    gameOver().then((result) => {
      if (result.isConfirmed) resetGame();
    });
    return;
  }

  game.snakeSegments[0].style.left = game.snakePosition.x + "px";
  game.snakeSegments[0].style.top = game.snakePosition.y + "px";
}
