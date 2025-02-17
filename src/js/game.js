const game = {
  snakeContainer: null,
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
  score: 0,
  highScores: JSON.parse(localStorage.getItem("highScores")) || [],
};

export default game;
