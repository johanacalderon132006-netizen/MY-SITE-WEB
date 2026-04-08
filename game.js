// --- CONFIGURACIÓN DEL CANVAS ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

// --- CARGA DE IMÁGENES ---
const playerImg = new Image();
playerImg.src = 'space-invaders.png';

const enemy1Img = new Image();
enemy1Img.src = 'enemy1.png';

const enemy2Img = new Image();
enemy2Img.src = 'enemy2.png';

const bulletImg = new Image();
bulletImg.src = 'bullet.png';

// --- VARIABLES DEL JUEGO ---
let score = 0;
let gameOver = false;

let player = {
    x: canvas.width / 2 - 32,
    y: canvas.height - 70,
    width: 60,
    height: 60,
    speed: 10,
    dx: 0
};

let bullet = {
    x: 0, y: 0, width: 15, height: 30,
    speed: 15, state: "ready"
};

let enemies = [];
const noOfEnemies = 10;

function createEnemies() {
    enemies = [];
    for (let i = 0; i < noOfEnemies; i++) {
        enemies.push({
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * (canvas.height / 3),
            width: 45, height: 45,
            dx: 5, dy: 30,
            img: i % 2 === 0 ? enemy1Img : enemy2Img
        });
    }
}

createEnemies();

// --- CONTROLES ---
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") player.dx = player.speed;
    if (e.key === " " && bullet.state === "ready") {
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
        bullet.state = "fire";
    }
    if (e.key.toLowerCase() === "r" && gameOver) resetGame();
});

document.addEventListener('keyup', (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.dx = 0;
});

// --- RASTRO DEL CURSOR ---
document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.className = 'star-trail';
    star.style.left = `${e.pageX}px`;
    star.style.top = `${e.pageY}px`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
});

// --- BUCLE PRINCIPAL ---
function update() {
    if (gameOver) return;

    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;

    if (bullet.state === "fire") {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullet.state = "ready";
    }

    enemies.forEach(enemy => {
        enemy.x += enemy.dx;
        if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.width) {
            enemy.dx *= -1;
            enemy.y += enemy.dy;
        }

        // Colisión Bala
        if (bullet.state === "fire" &&
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y) {
            bullet.state = "ready";
            score++;
            enemy.x = Math.random() * (canvas.width - 50);
            enemy.y = Math.random() * (canvas.height / 3);
        }

        // Condición de derrota
        if (enemy.y > canvas.height - 80) gameOver = true;
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    enemies.forEach(en => ctx.drawImage(en.img, en.x, en.y, en.width, en.height));
    if (bullet.state === "fire") ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);

    ctx.fillStyle = "white";
    ctx.font = "20px ALGERIAN";
    ctx.fillText(`SCORE: ${score}`, 20, 30);
    ctx.fillText("Alex Calderón", canvas.width - 280, 30);

    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "#00d4ff";
        ctx.font = "50px ALGERIAN";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        ctx.font = "20px ALGERIAN";
        ctx.fillText("Presiona 'R' para reiniciar", canvas.width/2, canvas.height/2 + 50);
        ctx.textAlign = "left";
    }
}

function resetGame() {
    score = 0; gameOver = false;
    player.x = canvas.width / 2 - 32;
    createEnemies();
    gameLoop();
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Iniciar al cargar imágenes
playerImg.onload = gameLoop;
