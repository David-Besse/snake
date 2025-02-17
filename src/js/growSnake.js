import game from "./game.js";

export default function growSnake() {
  const tail = game.snakeSegments[game.snakeSegments.length - 1];
  const newSegment = document.createElement("div");

  newSegment.classList.add("snake-segment");
  newSegment.style.left = tail.style.left;
  newSegment.style.top = tail.style.top;
  game.snakeContainer.appendChild(newSegment);
  game.snakeSegments.push(newSegment);
}
