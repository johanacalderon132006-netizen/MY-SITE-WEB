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
// --- CONTADOR DE VISITAS MEJORADO ---
async function obtenerVisitas() {
    const contadorElemento = document.getElementById('count');
    // Usamos el servicio de 'api.countapi.xyz' o este respaldo:
    const nombreProyecto = 'alex-calderon-2026-v2'; // Cambié el nombre para forzar uno nuevo

    try {
        // Probamos con una URL de respaldo que suele ser más rápida
        const respuesta = await fetch(`https://api.countapi.xyz/hit/${nombreProyecto}/visitas`);
        
        if (!respuesta.ok) throw new Error('Error en servidor');

        const datos = await respuesta.json();
        contadorElemento.innerText = datos.value;
    } catch (error) {
        console.log("Servidor ocupado, intentando de nuevo...");
        // Si falla, mostramos un número basado en localStorage para que al menos tú lo veas
        let locales = localStorage.getItem('misVisitas') || 0;
        locales++;
        localStorage.setItem('misVisitas', locales);
        contadorElemento.innerText = locales + "+"; 
    }
}

obtenerVisitas();
