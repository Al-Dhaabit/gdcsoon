// ============================================
// AUTONOMOUS FLOATING SCENE
// ============================================

const sceneWrapper = document.querySelector('.scene-wrapper');
const card = document.querySelector('.glass-card');
const glare = document.querySelector('.glare');
const blobs = document.querySelectorAll('.blob');

let time = 0;

function animate() {
    time += 0.01; // Animation speed

    // 1. GLOBAL SCENE MOVEMENT (Autonomous Pan)
    if (sceneWrapper) {
        // Slow, organic figure-eight / oval movement
        const moveX = Math.sin(time * 0.5) * 20;
        const moveY = Math.cos(time * 0.3) * 15;
        sceneWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // 2. CARD TILT (Autonomous Float)
    if (card) {
        // Subtle 3D tilting
        const rotateX = Math.sin(time * 0.4) * 5;
        const rotateY = Math.cos(time * 0.6) * 5;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // 3. GLARE SHIMMER
        if (glare) {
            // Move the glare in a loop to simulate a moving light source
            const glareX = 50 + Math.sin(time * 0.5) * 40;
            const glareY = 50 + Math.cos(time * 0.4) * 40;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`;
            glare.style.opacity = (Math.sin(time * 0.8) * 0.1) + 0.3; // Gentle pulsing opacity
        }
    }

    // 4. EXTRA BACKGROUND DRIFT
    blobs.forEach((blob, index) => {
        const offset = (index + 1) * 2;
        const bX = Math.sin(time * 0.2 + index) * 30;
        const bY = Math.cos(time * 0.2 + index) * 30;
        blob.style.transform = `translate(${bX}px, ${bY}px)`;
    });

    requestAnimationFrame(animate);
}

// Start the autonomous animation
animate();

// Handle screen resizing
window.addEventListener('resize', () => {
    // Re-trigger layout checks if necessary
});
