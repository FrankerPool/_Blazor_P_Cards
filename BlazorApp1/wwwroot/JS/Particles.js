document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector(".card-container"); // Cambiamos al contenedor padre
    const canvas = document.createElement("canvas");
    canvas.classList.add("fire-particles");
    cardContainer.appendChild(canvas); // Lo agregamos al contenedor padre

    const ctx = canvas.getContext("2d");
    let particles = [];
    let running = false;

    function resizeCanvas() {
        canvas.width = cardContainer.offsetWidth;
        canvas.height = cardContainer.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    card.addEventListener("mouseenter", () => {
        if (running) return;
        running = true;
        createParticles();
        requestAnimationFrame(updateParticles);
        setTimeout(() => {
            running = false;
            particles = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 1000);
    });

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                size: Math.random() * 4 + 2,
                speedY: Math.random() * -3 - 1,
                color: `rgba(255, ${Math.floor(Math.random() * 150)}, 0, ${Math.random()})`
            });
        }
    }

    function updateParticles() {
        if (!running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speedY;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        particles = particles.filter(p => p.y > -10);
        requestAnimationFrame(updateParticles);
    }
});
