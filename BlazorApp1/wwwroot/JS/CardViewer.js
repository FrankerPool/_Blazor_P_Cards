document.addEventListener("DOMContentLoaded", () => {
    console.log("Document ready");

    const card = document.getElementById("pokemon-card");

    if (card) {
        console.log("Tarjeta encontrada!");

        card.addEventListener("mouseenter", () => {
            console.log("Hover activado");

            const currentAngle = getCurrentRotation(card);
            console.log("Ángulo actual: " + currentAngle);

            // Pausar animación infinita
            card.classList.add("paused");

            // Definir ángulo actual en CSS variable
            card.style.setProperty('--current-angle', `${currentAngle}deg`);

            // Quitar animación infinita, lanzar animación de giro a frente
            card.classList.add("to-front");
        });

        card.addEventListener("mouseleave", () => {
            console.log("Hover desactivado");

            // Quitar animación de girar al frente
            card.classList.remove("to-front");

            // Restablecer animación infinita
            card.classList.remove("paused");
        });
    } else {
        console.log("Tarjeta NO encontrada");
    }
});

function getCurrentRotation(el) {
    const st = window.getComputedStyle(el, null);
    const tr = st.getPropertyValue("transform");

    if (tr === "none") return 0;

    const values = tr.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    return angle < 0 ? angle + 360 : angle;
}
