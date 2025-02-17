import game from "./game.js";

export function displayScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: ${game.score}`;
}

export function updateHighScores() {
  // Vérifier si le score actuel est supérieur au score le plus bas des meilleurs scores
  if (game.highScores.length < 10 || game.score > game.highScores[game.highScores.length - 1]) {
    game.highScores.push(game.score);
    game.highScores.sort((a, b) => b - a); // Trier les scores par ordre décroissant
    if (game.highScores.length > 10) {
      game.highScores.pop(); // Garder seulement les 10 meilleurs scores
    }
    localStorage.setItem("highScores", JSON.stringify(game.highScores)); // Sauvegarder les meilleurs scores dans le localStorage
  }
}

export function displayHighScores() {
  const highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = ""; // Réinitialiser la liste

  game.highScores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = score;
    highScoresList.appendChild(li);
  });
}


export function loadHighScores() {
  const storedScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedScores) {
    game.highScores = storedScores;
  }
}
