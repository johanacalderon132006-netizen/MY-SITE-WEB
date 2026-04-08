document.addEventListener('mousemove', (e) => {
    // Creamos el elemento de la estrella
    const star = document.createElement('div');
    star.className = 'star-trail';
    
    // Posición exacta del mouse
    // Usamos pageX/Y para que el rastro siga al cursor incluso si hay scroll
    star.style.left = `${e.pageX}px`;
    star.style.top = `${e.pageY}px`;
    
    // --- EFECTO "CHÉVERE" ADICIONAL ---
    // Tamaño aleatorio para que parezca polvo estelar real
    const size = Math.random() * 5 + 2; // Tamaños entre 2px y 7px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Desplazamiento aleatorio ligero para que no sea una línea perfecta
    const driftX = (Math.random() - 0.5) * 20;
    const driftY = (Math.random() - 0.5) * 20;
    star.style.setProperty('--drift-x', `${driftX}px`);
    star.style.setProperty('--drift-y', `${driftY}px`);

    document.body.appendChild(star);
    
    // Limpieza: eliminamos el elemento después de que termine la animación
    setTimeout(() => {
        star.remove();
    }, 800);
});
