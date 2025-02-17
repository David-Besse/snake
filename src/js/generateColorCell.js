import game from "./game.js";
import displayColorCells from "./displayColorCells.js";
import createColorCell from "./createColorCell.js";

export default function generateColorCell() {
  if (game.colorCells.length >= 10) {
    const cellToRemove = document
      .querySelector(".snake-container")
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
