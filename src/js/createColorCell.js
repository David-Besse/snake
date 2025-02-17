import game from "./game.js";

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

export default function createColorCell() {
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
