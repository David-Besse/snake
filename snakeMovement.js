import { game, checkWallCollision, gameOver, resetGame } from "./gameLogic.js";

export function moveSnake() {
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
      growSnake();

      if (game.snakeSpeed > 50) game.snakeSpeed -= 10;
    }
  });

  if (checkWallCollision()) {
    clearInterval(game.gameInterval);
    clearInterval(game.colorGenerationInterval);
    gameOver().then((result) => {
      if (result.isConfirmed) resetGame(createSnake, moveSnake);
    });
    return;
  }

  game.snakeSegments[0].style.left = game.snakePosition.x + "px";
  game.snakeSegments[0].style.top = game.snakePosition.y + "px";
}

export function growSnake() {
  const tail = game.snakeSegments[game.snakeSegments.length - 1];
  const newSegment = document.createElement("div");
  newSegment.classList.add("snake-segment");
  newSegment.style.left = tail.style.left;
  newSegment.style.top = tail.style.top;
  game.snake.appendChild(newSegment);
  game.snakeSegments.push(newSegment);
}

export function createSnake() {
  game.snakeSegments = [];

  const centerX = Math.floor(game.gridSize / 2);
  const centerY = Math.floor(game.gridSize / 2);

  game.snakePosition = { x: centerX * 10, y: centerY * 10 };

  for (let i = 0; i < 4; i++) {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    segment.style.left = game.snakePosition.x + i * 10 + "px";
    segment.style.top = game.snakePosition.y + "px";
    game.snake.appendChild(segment);
    game.snakeSegments.push(segment);
  }
}
