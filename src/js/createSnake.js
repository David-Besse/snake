import game from "./game.js";

export default function createSnake() {
  game.snakeSegments = [];

  const centerX = Math.floor(game.gridSize / 2);
  const centerY = Math.floor(game.gridSize / 2);

  game.snakePosition = { x: centerX * 10, y: centerY * 10 };

  for (let i = 0; i < 4; i++) {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    segment.style.left = game.snakePosition.x + i * 10 + "px";
    segment.style.top = game.snakePosition.y + "px";
    game.snakeContainer.appendChild(segment);
    game.snakeSegments.push(segment);
  }
}