const snake = document.getElementById("snake");
let snakeSegments = [];
let snakePosition = { x: 0, y: 0 };
let snakeDirection = "right";
let gridSize = 20;
let gameInterval;
let isPaused = false;
let colorCells = [];
let snakeLength = 4;

function createColorCell(gridSize) {
  let x, y;
  do {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
  } while (x === snakePosition.x / 10 && y === snakePosition.y / 10); // Evite de créer une case sur le serpent

  const color = getRandomColor();

  console.log("Coordonnées de la case de couleur :", x, y); // Vérification des coordonnées

  return { x, y, color };
}

function getRandomColor() {
  let color = "#";
  let r, g, b;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (r < 100 && g < 100 && b < 100); // Exclure les couleurs sombres

  color += r.toString(16);
  color += g.toString(16);
  color += b.toString(16);

  return color;
}

function displayColorCells(colorCells) {
  const grid = document.querySelector(".grid");

  colorCells.forEach((cell) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("color-cell");
    cellElement.style.left = cell.x * 10 + "px";
    cellElement.style.top = cell.y * 10 + "px";
    cellElement.style.backgroundColor = cell.color;
    grid.appendChild(cellElement);
  });
}

function checkWallCollision() {
  const head = snakeSegments[0]; // La tête du serpent
  const headX = snakePosition.x;
  const headY = snakePosition.y;

  // Vérifier les bords de la grille
  if (
    headX < 0 ||
    headX >= gridSize * 10 ||
    headY < 0 ||
    headY >= gridSize * 10
  ) {
    return true; // Collision détectée
  }

  return false; // Pas de collision
}

function moveSnake() {
  // Déplacer les segments (comme avant, mais avec le tableau snakeSegments)
  for (let i = snakeSegments.length - 1; i > 0; i--) {
    snakeSegments[i].style.left = snakeSegments[i - 1].style.left;
    snakeSegments[i].style.top = snakeSegments[i - 1].style.top;
  }

  // Déplacer la tête
  switch (snakeDirection) {
    case "right":
      snakePosition.x += 10;
      break;
    case "left":
      snakePosition.x -= 10;
      break;
    case "up":
      snakePosition.y -= 10;
      break;
    case "down":
      snakePosition.y += 10;
      break;
  }

  // Vérifier la collision avec les cases de couleur
  const head = snakeSegments[0];
  const headX = snakePosition.x;
  const headY = snakePosition.y;

  colorCells.forEach((cell, index) => {
    if (headX === cell.x * 10 && headY === cell.y * 10) {
      // Le serpent a absorbé la case de couleur
      colorCells.splice(index, 1); // Supprimer la case du tableau
      snakeLength++; // Augmenter la longueur du serpent
      growSnake(); // Fonction pour faire grandir le serpent (voir ci-dessous)
    }
  });

  // Vérifier la collision avec un mur
  if (checkWallCollision()) {
    clearInterval(gameInterval); // Arrêter le jeu
    gameOver(); // Fonction à définir pour gérer la fin de partie
    return; // Empêcher le serpent de continuer à se déplacer
  }

  // Gestion des bords (important !)
  //   if (snakePosition.x < 0) snakePosition.x = (gridSize - 1) * 10;
  //   if (snakePosition.x >= gridSize * 10) snakePosition.x = 0;
  //   if (snakePosition.y < 0) snakePosition.y = (gridSize - 1) * 10;
  //   if (snakePosition.y >= gridSize * 10) snakePosition.y = 0;

  snakeSegments[0].style.left = snakePosition.x + "px";
  snakeSegments[0].style.top = snakePosition.y + "px";
}

function growSnake() {
  const tail = snakeSegments[snakeSegments.length - 1]; // Dernier segment du serpent
  const newSegment = document.createElement("div");
  newSegment.classList.add("snake-segment");
  newSegment.style.left = tail.style.left;
  newSegment.style.top = tail.style.top;
  snake.appendChild(newSegment);
  snakeSegments.push(newSegment);
}

function gameOver() {
  Swal.fire({
    title: "Game Over !",
    text: "Vous avez heurté un mur.",
    icon: "error",
    confirmButtonText: "Réessayer",
  }).then((result) => {
    if (result.isConfirmed) {
      resetGame(); // Fonction pour réinitialiser le jeu (à implémenter)
    }
  });
}

function resetGame() {
  // Réinitialiser la position du serpent
  snakePosition = { x: 0, y: 0 };
  snakeDirection = "right";

  // Supprimer les segments du serpent
  snake.innerHTML = "";
  snakeSegments = [];

  // Recréer le serpent
  createSnake();

  // Redémarrer le jeu
  clearInterval(gameInterval);
  gameInterval = setInterval(moveSnake, 200);
}

function createGrid(size) {
  const grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${size}, 10px)`;
  grid.style.gridTemplateRows = `repeat(${size}, 10px)`;
  grid.style.width = `${size * 10}px`;
  grid.style.height = `${size * 10}px`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = j; // Stocker x et y
      cell.dataset.y = i;
      grid.appendChild(cell);
    }
  }
}

function createSnake() {
  snakeSegments = [];

  // Calculer la position centrale de la grille
  const centerX = Math.floor(gridSize / 2);
  const centerY = Math.floor(gridSize / 2);

  // Définir la position initiale du serpent au centre
  snakePosition = { x: centerX * 10, y: centerY * 10 };

  for (let i = 0; i < 4; i++) {
    // Créer 4 segments
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    segment.style.left = snakePosition.x + i * 10 + "px";
    segment.style.top = snakePosition.y + "px";
    snake.appendChild(segment);
    snakeSegments.push(segment);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createGrid(gridSize);
  createSnake();
  gameInterval = setInterval(moveSnake, 200);

  // Générer les cases de couleur toutes les 10 secondes
  setInterval(() => {
    if (colorCells.length >= 10) {
      const grid = document.querySelector(".grid");
      const cellToRemove = grid.querySelector(".color-cell");
      grid.removeChild(cellToRemove);
      colorCells.shift();
    }

    const newColorCell = createColorCell(gridSize);
    colorCells.push(newColorCell);
    displayColorCells([newColorCell]);
  }, 10000);
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    isPaused = !isPaused; // Inverser l'état de pause

    const pauseAlert = document.getElementById("pause-alert");
    pauseAlert.style.display = isPaused ? "block" : "none";

    const overlay = document.getElementById("overlay");
    overlay.style.display = isPaused ? "block" : "none";

    if (isPaused) {
      clearInterval(gameInterval); // Mettre le jeu en pause
    } else {
      gameInterval = setInterval(moveSnake, 200); // Reprendre le jeu
    }
  }
});

// Gestion des touches directionnelles
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      snakeDirection = "up";
      break;
    case "ArrowDown":
      snakeDirection = "down";
      break;
    case "ArrowLeft":
      snakeDirection = "left";
      break;
    case "ArrowRight":
      snakeDirection = "right";
      break;
  }
});
