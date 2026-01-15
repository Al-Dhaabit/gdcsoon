// ============================================
// MASCOT ONLY - RANDOM WANDERING
// ============================================

const mascot = document.querySelector('.mascot');

// Vector-based movement with random angles
const fox = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: (Math.random() - 0.5) * 2.5, // Random direction
    vy: (Math.random() - 0.5) * 2.5,
    speed: 1.0 // SLOWED DOWN
};

function animate() {
    if (mascot) {
        // Update position
        fox.x += fox.vx * fox.speed;
        fox.y += fox.vy * fox.speed;

        // Dynamic boundaries based on actual mascot size
        const width = mascot.offsetWidth;
        const height = mascot.offsetHeight;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // Absolute limits - Touching the very edge of the screen
        const leftBound = halfWidth;
        const rightBound = window.innerWidth - halfWidth;
        const topBound = halfHeight;
        const bottomBound = window.innerHeight - halfHeight;

        // X Collision (Random angle on bounce)
        if (fox.x <= leftBound) {
            fox.x = leftBound;
            fox.vx = Math.abs(fox.vx); // Bounce right
            // RANDOMIZE the Y angle on bounce
            fox.vy = (Math.random() - 0.5) * 3;
        } else if (fox.x >= rightBound) {
            fox.x = rightBound;
            fox.vx = -Math.abs(fox.vx); // Bounce left
            fox.vy = (Math.random() - 0.5) * 3;
        }

        // Y Collision (Random angle on bounce)
        if (fox.y <= topBound) {
            fox.y = topBound;
            fox.vy = Math.abs(fox.vy); // Bounce down
            fox.vx = (Math.random() - 0.5) * 3;
        } else if (fox.y >= bottomBound) {
            fox.y = bottomBound;
            fox.vy = -Math.abs(fox.vy); // Bounce up
            fox.vx = (Math.random() - 0.5) * 3;
        }

        // Visual Orientation
        const tilt = fox.vx * 2;
        const scaleX = fox.vx < 0 ? -1 : 1;

        mascot.style.transform = `translate(${fox.x}px, ${fox.y}px) scaleX(${scaleX}) rotate(${tilt}deg)`;
    }

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle screen resize
window.addEventListener('resize', () => {
    if (mascot) {
        const hW = mascot.offsetWidth / 2;
        const hH = mascot.offsetHeight / 2;
        fox.x = Math.min(Math.max(fox.x, hW), window.innerWidth - hW);
        fox.y = Math.min(Math.max(fox.y, hH), window.innerHeight - hH);
    }
});
