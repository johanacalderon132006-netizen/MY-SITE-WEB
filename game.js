const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const startScreen = document.getElementById("start-screen");

// Ajustar tamaño del canvas al contenedor
canvas.width = canvas.parentElement.clientWidth;
canvas.height = 500;

let score = 0;
let gameRunning = false;
let asteroids = [];
let ship = { x: canvas.width / 2, y: canvas.height - 50, w: 30, h: 30 };

// Control de nave
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    ship.x = e.clientX - rect.left - ship.w / 2;
});

function createAsteroid() {
    const size = Math.random() * 30 + 10;
    asteroids.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        size: size,
        speed: Math.random() * 3 + 2 + (score / 100) // Aumenta velocidad con el score
    });
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Nave (Triángulo Neón)
    ctx.fillStyle = "#00d4ff";
    ctx.beginPath();
    ctx.moveTo(ship.x + ship.w / 2, ship.y);
    ctx.lineTo(ship.x, ship.y + ship.h);
    ctx.lineTo(ship.x + ship.w, ship.y + ship.h);
    ctx.fill();

    // Actualizar Asteroides
    for (let i = 0; i < asteroids.length; i++) {
        let a = asteroids[i];
        a.y += a.speed;

        // Dibujar Asteroide
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();

        // Colisión
        if (ship.x < a.x + a.size && ship.x + ship.w > a.x - a.size &&
            ship.y < a.y + a.size && ship.y + ship.h > a.y - a.size) {
            endGame();
        }

        // Eliminar si sale de pantalla
        if (a.y > canvas.height) {
            asteroids.splice(i, 1);
            score += 10;
            scoreElement.innerText = `Puntos: ${score}`;
            i--;
        }
    }

    if (Math.random() < 0.05) createAsteroid();

    requestAnimationFrame(update);
}

function startGame() {
    gameRunning = true;
    startScreen.style.display = "none";
    update();
}

function endGame() {
    gameRunning = false;
    gameOverScreen.style.display = "block";
    document.getElementById("final-score").innerText = `Puntaje Final: ${score}`;
}

function resetGame() {
    score = 0;
    asteroids = [];
    scoreElement.innerText = "Puntos: 0";
    gameOverScreen.style.display = "none";
    gameRunning = true;
    update();
}
