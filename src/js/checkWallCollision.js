import game from "./game.js";

export default function checkWallCollision() {
  const { x, y } = game.snakePosition;
  return x < 0 || x >= game.gridSize * 10 || y < 0 || y >= game.gridSize * 10;
}
