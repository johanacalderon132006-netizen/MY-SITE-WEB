// 1. Efecto de inclinación 3D en las tarjetas (Más fluido)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculamos la posición del mouse relativa a la tarjeta
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reducimos el factor de división (15) para que el movimiento sea más notable
        const rotateX = (centerY - y) / 15; 
        const rotateY = (x - centerX) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    // Al salir, la tarjeta regresa suavemente a su posición original
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 2. Animación de revelación al hacer Scroll (Optimizado)
const reveal = () => {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;
    const triggerPoint = 150; // Distancia antes de aparecer

    cards.forEach(card => {
        const elementTop = card.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

// Configuración inicial de las tarjetas para la animación de entrada
document.querySelectorAll('.card').forEach(c => {
    c.style.opacity = "0";
    c.style.transform = "translateY(50px)";
    c.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out, border-color 0.3s ease";
});

// Escuchar el evento scroll con un pequeño retraso para mejorar el rendimiento
window.addEventListener('scroll', () => {
    requestAnimationFrame(reveal);
});

// Ejecutar una vez al cargar para mostrar las tarjetas que ya están en pantalla
window.addEventListener('load', reveal);

// 3. El rastro del cursor (Sincronizado con el fondo Naranja/Neón)
document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.className = 'star-trail';
    
    // Posicionamiento preciso
    star.style.left = `${e.pageX}px`;
    star.style.top = `${e.pageY}px`;
    
    // Variación de tamaño aleatoria para un efecto más natural
    const size = Math.random() * 4 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Color naranja brillante que combine con tu imagen de fondo
    star.style.background = '#ff9d00';
    star.style.boxShadow = '0 0 15px #ff9d00, 0 0 5px #fff';
    
    document.body.appendChild(star);
    
    // Eliminación automática para no saturar la memoria
    setTimeout(() => {
        star.remove();
    }, 700);
});
