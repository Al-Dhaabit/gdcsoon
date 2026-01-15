// ============================================
// MASCOT ONLY - EVERYTHING ELSE STATIC
// ============================================

const mascot = document.querySelector('.mascot');
let time = 0;

// Mascot state for "wandering"
const mascotState = {
    x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
    y: Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1,
    angle: Math.random() * Math.PI * 2,
    speed: 0.8
};

function animate() {
    time += 0.01;

    // 1. BACKGROUND BLOBS DRIFT (Re-enabled)
    if (blobs) {
        blobs.forEach((blob, index) => {
            // Slower, deeper breathing movement
            const bX = Math.sin(time * 0.1 + index) * 50;
            const bY = Math.cos(time * 0.15 + index) * 40;
            blob.style.transform = `translate(${bX}px, ${bY}px)`;
        });
    }

    // 2. MASCOT WANDERING LOGIC (The ONLY thing moving)
    if (mascot) {
        // Slow organic turn
        mascotState.angle += Math.sin(time * 1.5) * 0.015;

        // Update position
        mascotState.x += Math.cos(mascotState.angle) * mascotState.speed;
        mascotState.y += Math.sin(mascotState.angle) * mascotState.speed;

        // Bounce off screen edges with PUSH-BACK
        const padding = 80;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (mascotState.x < padding) {
            mascotState.x = padding + 5;
            mascotState.angle = Math.PI - mascotState.angle + (Math.random() - 0.5) * 0.5;
        } else if (mascotState.x > width - padding) {
            mascotState.x = width - padding - 5;
            mascotState.angle = Math.PI - mascotState.angle + (Math.random() - 0.5) * 0.5;
        }

        if (mascotState.y < padding) {
            mascotState.y = padding + 5;
            mascotState.angle = -mascotState.angle + (Math.random() - 0.5) * 0.5;
        } else if (mascotState.y > height - padding) {
            mascotState.y = height - padding - 5;
            mascotState.angle = -mascotState.angle + (Math.random() - 0.5) * 0.5;
        }

        // Gentle tilt and flip based on direction
        const tilt = Math.sin(time * 2) * 4;
        const scaleX = Math.cos(mascotState.angle) > 0 ? 1 : -1;

        mascot.style.left = `${mascotState.x}px`;
        mascot.style.top = `${mascotState.y}px`;
        mascot.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) rotate(${tilt}deg)`;
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle screen resize
window.addEventListener('resize', () => {
    if (mascotState.x > window.innerWidth) mascotState.x = window.innerWidth / 2;
    if (mascotState.y > window.innerHeight) mascotState.y = window.innerHeight / 2;
});
