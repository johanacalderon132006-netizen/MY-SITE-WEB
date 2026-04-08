/* =========================================
   ESTILO COSMOS - AZUL CIAN ORIGINAL
   ========================================= */

* { 
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #000;
    /* Restauramos el fondo de nebulosa dinámico con gradientes */
    background-image: 
        radial-gradient(circle at 20% 30%, rgba(70, 0, 150, 0.3) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(0, 100, 200, 0.3) 0%, transparent 40%),
        linear-gradient(135deg, #05070a 0%, #000000 100%);
    background-attachment: fixed;
    color: #e0e0e0;
    overflow-x: hidden;
}

/* Efecto de polvo estelar animado (Stardust) */
body::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: url('https://www.transparenttextures.com/patterns/stardust.png');
    opacity: 0.4;
    z-index: -1;
    animation: backgroundMove 120s linear infinite;
}

@keyframes backgroundMove {
    from { background-position: 0 0; }
    to { background-position: 1000px 1000px; }
}

/* 2. NAVEGACIÓN */
header {
    background: rgba(0, 0, 0, 0.85);
    padding: 20px;
    position: sticky;
    top: 0;
    backdrop-filter: blur(15px);
    border-bottom: 2px solid #00d4ff;
    z-index: 1000;
    text-align: center;
}

nav { display: flex; justify-content: center; gap: 10px; }

nav a {
    color: #888;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.85rem;
    margin: 0 15px;
    letter-spacing: 1px;
    transition: color 0.3s ease, text-shadow 0.3s ease;
}

nav a:hover, nav a.active {
    color: #00d4ff;
    text-shadow: 0 0 10px #00d4ff;
}

/* 3. CONTENEDORES Y TARJETAS */
.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
}

.card {
    background: rgba(10, 15, 30, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 40px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.8);
    /* Transiciones suaves para hover e inclinación */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
}

.card:hover {
    border-color: #00d4ff;
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
}

h1 { color: #fff; font-size: 2.8rem; margin-top: 0; }
h3 { color: #00d4ff; margin-top: 25px; }
p { font-size: 1.1rem; line-height: 1.8; color: #ccc; }

img {
    width: 100%;
    border-radius: 15px;
    margin: 20px 0;
    border: 1px solid rgba(255,255,255,0.1);
}

/* 4. EFECTOS DEL CURSOR (JavaScript) */
.star-trail {
    position: absolute;
    width: 4px; height: 4px;
    background: #00d4ff; /* Azul original */
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 10px #00d4ff;
    z-index: 9999;
    animation: fadeOutCursor 0.8s forwards;
}

@keyframes fadeOutCursor {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(5); }
}

/* 5. EL JUEGO */
#gameCanvas {
    display: block;
    width: 100%;
    height: 500px;
    background: radial-gradient(circle, #0a0f1e 0%, #000 100%);
    box-shadow: inset 0 0 50px rgba(0, 212, 255, 0.2);
    border-radius: 10px;
    border: 1px solid #00d4ff;
}
// Rastro de estrellas al mover el mouse
document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.className = 'star-trail';
    star.style.left = e.pageX + 'px';
    star.style.top = e.pageY + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
});
