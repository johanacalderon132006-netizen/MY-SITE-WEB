// 1. Efecto de inclinación 3D en las tarjetas

document.querySelectorAll('.card').forEach(card => {

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        

        const rotateX = (y - centerY) / 20;

        const rotateY = (centerX - x) / 20;

        

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    

    card.addEventListener('mouseleave', () => {

        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;

    });

});



// 2. Animación de revelación al hacer Scroll

const reveal = () => {

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {

        const windowHeight = window.innerHeight;

        const elementTop = card.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            card.style.opacity = "1";

            card.style.top = "0";

        }

    });

};



// Configuración inicial para el scroll

document.querySelectorAll('.card').forEach(c => {

    c.style.opacity = "0";

    c.style.position = "relative";

    c.style.top = "50px";

    c.style.transition = "all 0.8s ease-out";

});



window.addEventListener('scroll', reveal);

reveal(); // Ejecutar una vez al cargar



// 3. El rastro del cursor mejorado

document.addEventListener('mousemove', (e) => {

    const star = document.createElement('div');

    star.className = 'star-trail';

    star.style.left = e.pageX + 'px';

    star.style.top = e.pageY + 'px';

    document.body.appendChild(star);
