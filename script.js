// Animación de entrada suave para las tarjetas
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// Rastro de estrellas al mover el mouse
document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.className = 'star-trail';
    star.style.left = e.pageX + 'px';
    star.style.top = e.pageY + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
});
