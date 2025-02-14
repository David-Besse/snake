export const game = {
  snakeSegments: [],
  snakePosition: { x: 0, y: 0 },
  snakeDirection: "right",
  gridSize: 50,
  isPaused: false,
  colorCells: [],
  snakeLength: 4,
  lastTime: 0,
  snakeSpeed: 200,
  isGameOver: false,
  colorGenerationInterval: null,
};

export function createColorCell() {
  let x, y;
  do {
    x = Math.floor(Math.random() * game.gridSize);
    y = Math.floor(Math.random() * game.gridSize);
  } while (
    game.snakeSegments.some(
      (segment) =>
        segment.style.left === `${x * 10}px` &&
        segment.style.top === `${y * 10}px`
    )
  );
  const color = getRandomColor();
  const id = `color-cell-${Date.now()}-${Math.random()}`;
  return { x, y, color, id };
}

function getRandomColor() {
  let color;
  do {
    color = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
  } while (
    /^#([0-9A-F]{2}){3}$/i.test(color) &&
    parseInt(color.slice(1, 3), 16) < 100 &&
    parseInt(color.slice(3, 5), 16) < 100 &&
    parseInt(color.slice(5, 7), 16) < 100
  );
  return color;
}

export function checkWallCollision() {
  const { x, y } = game.snakePosition;
  return x < 0 || x >= game.gridSize * 10 || y < 0 || y >= game.gridSize * 10;
}

export function gameOver() {
  game.isGameOver = true;
  return Swal.fire({
    title: "Game Over !",
    text: "Vous avez heurté un mur.",
    icon: "error",
    confirmButtonText: "Réessayer",
  });
}

export function resetGame(createSnake, moveSnake) {
  Object.assign(game, {
    snakePosition: { x: 0, y: 0 },
    snakeDirection: "right",
    snakeSegments: [],
    isGameOver: false,
  });

  createSnake();
  clearInterval(game.gameInterval);
  clearInterval(game.colorGenerationInterval);
  game.gameInterval = setInterval(moveSnake, 200);
  game.colorGenerationInterval = setInterval(generateColorCell, 5000);
}

export function generateColorCell() {
  if (game.colorCells.length >= 10) {
    const cellToRemove = document
      .querySelector(".grid")
      .querySelector(".color-cell");
    if (cellToRemove) {
      cellToRemove.remove();
      game.colorCells.shift();
    }
  }

  const newColorCell = createColorCell();
  game.colorCells.push(newColorCell);
  displayColorCells();
}
