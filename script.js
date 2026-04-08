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
// --- CONTADOR DE VISITAS ---
const contadorElemento = document.getElementById('count');

async function obtenerVisitas() {
    try {
        // Sustituye 'tu_nombre_unico' por algo personalizado, ej: 'alex-space-invader-2026'
        const nombreProyecto = 'alex-calderon-informatica-v1';
        
        // Esta URL crea el contador automáticamente la primera vez que entras
        const respuesta = await fetch(`https://api.countapi.xyz/hit/${nombreProyecto}/visitas`);
        const datos = await respuesta.json();
        
        // Ponemos el número en el HTML
        contadorElemento.innerText = datos.value;
    } catch (error) {
        console.log("Error con la API, usando contador de respaldo");
        // Si la API falla, usamos un número fijo o local para que no se vea feo
        contadorElemento.innerText = "1";
    }
}

obtenerVisitas();
