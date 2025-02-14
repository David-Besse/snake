import { game } from "./gameLogic.js";

export function displayColorCells() {
  const grid = document.querySelector(".grid");
  const fragment = document.createDocumentFragment();

  game.colorCells.forEach((cell) => {
    if (!document.getElementById(cell.id)) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("color-cell");
      cellElement.id = cell.id;
      cellElement.style.left = `${cell.x * 10}px`;
      cellElement.style.top = `${cell.y * 10}px`;
      cellElement.style.backgroundColor = cell.color;
      fragment.appendChild(cellElement);
    }
  });

  grid.appendChild(fragment);
}

export function displaySnake() {
  const grid = document.querySelector(".grid");
  game.snakeSegments.forEach((segment) => {
    if (!segment.parentNode) {
      grid.appendChild(segment);
    }
  });
}
