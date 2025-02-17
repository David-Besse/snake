import Swal from "sweetalert2";
import game from "./game.js";
import { updateHighScores, displayHighScores } from "./displayScore.js";

export default function gameOver() {
  game.isGameOver = true;

  updateHighScores();
  displayHighScores();

  return Swal.fire({
    title: "Game Over !",
    text: "Vous avez heurté un mur.",
    icon: "error",
    confirmButtonText: "Réessayer",
  });
}
