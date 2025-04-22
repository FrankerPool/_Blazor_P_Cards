document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("pokemon-card");
    const canvas = document.createElement("canvas");
    const flameImg = new Image();
    const poisonImg = new Image();
    const leafImg = new Image();
    const waterImg = new Image();
    
    flameImg.src = "./IMG/FireParticle.png";
    poisonImg.src = "./IMG/PoisonParticle.png";
    leafImg.src = "./IMG/LeafParticle.png"
    // Esperar a que la imagen se cargue antes de continuar
    flameImg.onload = () => {
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "2147483647";

        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let particles = [];
        let running = false;
        let timer = null; // para manejar tiempo personalizado

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // ejemplo: card.addEventListener("mouseenter", () => startParticles("fire"));
        card.addEventListener("mouseenter", () => startParticles("fire"));

        function startParticles(type) {
            if (running) return;
            running = true;
            const rect = card.getBoundingClientRect();
            createParticles(rect, type);
            requestAnimationFrame(updateParticles);

            clearTimeout(timer); // por si ya había un tiempo corriendo

            // 👇 aquí puedes cambiar la duración de las partículas (en milisegundos)
            timer = setTimeout(() => {
                running = false;
                particles = [];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 2000); // <<< DURACIÓN AQUÍ — cámbiala si quieres que dure más
        }

        window.startParticles = startParticles;

        function createParticles(rect, type) {
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: rect.left + Math.random() * rect.width,
                    y: rect.top + rect.height,
                    size: Math.random() * 60 + 5,
                    speedY: Math.random() * -1 - .5,
                    speedX: (Math.random() - 0.25) * 2,
                    opacity: 1,
                    type: type
                });
            }
        }

        function updateParticles() {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada frame
        
            particles.forEach(p => {
                p.x += p.speedX;  // Movimiento en el eje X
                p.y += p.speedY;  // Movimiento en el eje Y
                p.opacity -= 0.0035; // Velocidad de desvanecimiento (ajustable)
                if (p.opacity < 0) p.opacity = 0;
        
                switch (p.type) {
                    case "fire":
                        ctx.globalAlpha = p.opacity;  // Ajusta la opacidad de la partícula
                        ctx.drawImage(flameImg, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                        ctx.globalAlpha = 1;  // Vuelve a la opacidad por defecto
                        break;
                    case "leaf":
                        ctx.globalAlpha = p.opacity;  // Ajusta la opacidad de la partícula
                        ctx.drawImage(leafImg, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                        ctx.globalAlpha = 1;  // Vuelve a la opacidad por defecto
                        break;
                    case "water":
                        // Dibuja partículas de agua si es necesario
                        ctx.globalAlpha = p.opacity;  // Ajusta la opacidad de la partícula
                        ctx.drawImage(waterImg, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                        ctx.globalAlpha = 1;  // Vuelve a la opacidad por defecto
                        break;
                    case "poison":
                        // Dibuja partículas de veneno si es necesario
                        ctx.globalAlpha = p.opacity;  // Ajusta la opacidad de la partícula
                        ctx.drawImage(poisonImg, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                        ctx.globalAlpha = 1;  // Vuelve a la opacidad por defecto
                        break;
                }
            });
        
            // Filtra las partículas que ya se han desvanecido
            particles = particles.filter(p => p.opacity > 0);
            requestAnimationFrame(updateParticles);  // Vuelve a llamar a la función para animación
        }

    };
});