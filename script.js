// ============================================
// AUTONOMOUS FLOATING SCENE & MASCOT
// ============================================

const sceneWrapper = document.querySelector('.scene-wrapper');
const card = document.querySelector('.glass-card');
const glare = document.querySelector('.glare');
const blobs = document.querySelectorAll('.blob');
const mascot = document.querySelector('.mascot');

let time = 0;

// Mascot state for "wandering"
const mascotState = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    angle: Math.random() * Math.PI * 2,
    speed: 1.5,
    rotation: 0
};

function animate() {
    time += 0.01;

    // 1. GLOBAL SCENE MOVEMENT (Autonomous Pan)
    if (sceneWrapper) {
        const moveX = Math.sin(time * 0.5) * 20;
        const moveY = Math.cos(time * 0.3) * 15;
        sceneWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // 2. CARD TILT (Autonomous Float)
    if (card) {
        const rotateX = Math.sin(time * 0.4) * 8;
        const rotateY = Math.cos(time * 0.6) * 8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // 3. GLARE SHIMMER
        if (glare) {
            const glareX = 50 + Math.sin(time * 0.5) * 40;
            const glareY = 50 + Math.cos(time * 0.4) * 40;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`;
            glare.style.opacity = (Math.sin(time * 0.8) * 0.1) + 0.3;
        }
    }

    // 4. BACKGROUND BLOBS DRIFT
    blobs.forEach((blob, index) => {
        const bX = Math.sin(time * 0.2 + index) * 40;
        const bY = Math.cos(time * 0.2 + index) * 40;
        blob.style.transform = `translate(${bX}px, ${bY}px)`;
    });

    // 5. MASCOT WANDERING LOGIC
    if (mascot) {
        // Update angle slowly for organic turn
        mascotState.angle += (Math.sin(time * 2) * 0.02);

        // Update position
        mascotState.x += Math.cos(mascotState.angle) * mascotState.speed;
        mascotState.y += Math.sin(mascotState.angle) * mascotState.speed;

        // Bounce off screen edges
        const padding = 50;
        if (mascotState.x < padding || mascotState.x > window.innerWidth - padding) {
            mascotState.angle = Math.PI - mascotState.angle;
        }
        if (mascotState.y < padding || mascotState.y > window.innerHeight - padding) {
            mascotState.angle = -mascotState.angle;
        }

        // Apply position and subtle rotation based on direction
        const tilt = Math.sin(time * 3) * 5;
        const scaleX = Math.cos(mascotState.angle) > 0 ? 1 : -1; // Flip based on direction
        mascot.style.left = `${mascotState.x}px`;
        mascot.style.top = `${mascotState.y}px`;
        mascot.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) rotate(${tilt}deg)`;
    }

    requestAnimationFrame(animate);
}

// Start everything
animate();

// Handle screen resize
window.addEventListener('resize', () => {
    // Keep mascot inside viewport if it's too small
    if (mascotState.x > window.innerWidth) mascotState.x = window.innerWidth / 2;
    if (mascotState.y > window.innerHeight) mascotState.y = window.innerHeight / 2;
});
