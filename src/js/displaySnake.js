import game from "./game.js";

export default function displaySnake() {
  game.snakeSegments.forEach((segment) => {
    if (!segment.parentNode) {
      game.snakeContainer.appendChild(segment);
    }
  });
}
