import game from "./game.js";
import createSnake from "./createSnake.js";
import generateColorCell from "./generateColorCell.js";
import moveSnake from "./moveSnake.js";

export default function resetGame() {
  Object.assign(game, {
    snakePosition: { x: 0, y: 0 },
    snakeDirection: "right",
    snakeSegments: [],
    colorCells: [],
    isGameOver: false,
  });

  document.querySelectorAll(".snake-segment").forEach((segment) => {
    segment.remove();
  });

  document.querySelectorAll(".color-cell").forEach((cell) => {
    cell.remove();
  })

  createSnake();
  clearInterval(game.gameInterval);
  clearInterval(game.colorGenerationInterval);
  game.gameInterval = setInterval(moveSnake, 200);
  game.colorGenerationInterval = setInterval(generateColorCell, 5000);
}
