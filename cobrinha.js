const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start");

const width = 10; // 10x10 = 100 quadrados
let squares = [];

let snake = [];
let direction = 1;
let foodIndex = 0;
let score = 0;
let interval = 300;
let timerId = null;

/* Criar grid */
function createGrid() {
    grid.innerHTML = "";
    squares = [];

    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);
    }
}

/* Iniciar jogo */
function startGame() {
    clearInterval(timerId);

    createGrid();

    snake = [2, 1, 0];
    direction = 1;
    interval = 300;
    score = 0;
    scoreDisplay.textContent = score;

    squares.forEach(s => s.className = "");
    snake.forEach(i => squares[i].classList.add("snake"));

    placeFood();

    timerId = setInterval(move, interval);
}

/* Movimento da cobra */
function move() {

    if (
        (snake[0] + width >= width * width && direction === width) || 
        (snake[0] % width === width - 1 && direction === 1) ||
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] - width < 0 && direction === -width) ||
        squares[snake[0] + direction].classList.contains("snake")
    ) {
        alert("Game Over!");
        return clearInterval(timerId);
    }

    const tail = snake.pop();
    squares[tail].classList.remove("snake");

    const newHead = snake[0] + direction;
    snake.unshift(newHead);

    if (newHead === foodIndex) {
        squares[foodIndex].classList.remove("food");
        snake.push(tail);
        placeFood();
        score++;
        scoreDisplay.textContent = score;

        interval *= 0.95;
        clearInterval(timerId);
        timerId = setInterval(move, interval);
    }

    squares[newHead].classList.add("snake");
}

/* Colocar comida */
function placeFood() {
    do {
        foodIndex = Math.floor(Math.random() * squares.length);
    } while (squares[foodIndex].classList.contains("snake"));

    squares[foodIndex].classList.add("food");
}

/* Controles */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") direction = -width;
    if (e.key === "ArrowDown") direction = width;
    if (e.key === "ArrowLeft") direction = -1;
    if (e.key === "ArrowRight") direction = 1;
});

/* Botão Start */
startBtn.addEventListener("click", startGame);
