function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.style.left = menu.style.left === '-200px' ? '0' : '-200px';
}
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');

    // Si la cible du clic n'est ni le menu ni le bouton de toggle
    if (!menu.contains(event.target) && event.target !== menuToggle) {
        menu.style.left = '-200px'; // Ferme le menu
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const viewport = document.getElementById('viewport');
    const container = document.getElementById('container');
    const greenSquare = document.getElementById('green');
    const orangeSquare = document.getElementById('orange');
    const redSquare = document.getElementById('red');

    let zoomLevel = 1;
    let isMouseDown = false;
    let startX;
    let startY;
    let translateX = 0;
    let translateY = 0;

    viewport.addEventListener('mouseenter', function(event) {
        container.style.transition = 'transform 0.5s ease-out';
    });

    viewport.addEventListener('mouseleave', function(event) {
        container.style.transition = 'none';
    });

    viewport.addEventListener('mousemove', function(event) {
        if (isMouseDown) {
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;
            translateX += deltaX / zoomLevel;
            translateY += deltaY / zoomLevel;
            container.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
            startX = event.clientX;
            startY = event.clientY;
        }
    });

    viewport.addEventListener('wheel', function(event) {
        event.preventDefault();
        
        zoomLevel += event.deltaY * -0.0025;

        if (zoomLevel < 0.1) {
            zoomLevel = 0.1;
        }

        container.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;

        if (zoomLevel < 5) {
            greenSquare.style.display = 'block';
            orangeSquare.style.display = 'none';
            redSquare.style.display = 'none';
        } else if (zoomLevel >= 5 && zoomLevel < 10) {
            greenSquare.style.display = 'none';
            orangeSquare.style.display = 'block';
            redSquare.style.display = 'none';
        } else if (zoomLevel >= 10) {
            greenSquare.style.display = 'none';
            orangeSquare.style.display = 'none';
            redSquare.style.display = 'block';
        }
    });

    viewport.addEventListener('mousedown', function(event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = true;
            startX = event.clientX;
            startY = event.clientY;
        }
    });

    document.addEventListener('mouseup', function(event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = false;
        }
    });
});
