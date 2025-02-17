import game from "./game.js";

export default function displayColorCells() {
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

  game.snakeContainer.appendChild(fragment);
}
