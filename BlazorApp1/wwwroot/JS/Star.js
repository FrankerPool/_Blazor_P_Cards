const stars = document.querySelectorAll('.star');

stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
        let value = parseInt(star.getAttribute('data-value'));
        highlightStars(value);
    });

    star.addEventListener('mouseleave', () => {
        resetStars();
    });

    star.addEventListener('click', () => {
        setActiveStar(star);
    });
});

function highlightStars(value) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));

        // Resaltar estrellas hasta la seleccionada
        if (starValue <= value) {
            star.classList.add('highlighted');
        } else {
            star.classList.remove('highlighted');
        }
    });
}

function resetStars() {
    stars.forEach(star => {
        star.classList.remove('highlighted');
    });
}

function setActiveStar(selectedStar) {
    const selectedValue = parseInt(selectedStar.getAttribute('data-value'));

    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));

        if (starValue <= selectedValue) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}
