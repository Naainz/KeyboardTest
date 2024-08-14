const pressedKeys = new Set();
const keyElements = document.querySelectorAll('.key');
const totalKeys = 54;

document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();

    keyElements.forEach(element => {
        let keyContent = element.textContent.trim().toUpperCase();

        if (keyContent === 'ESC' && event.key === 'Escape') {
            element.classList.add('active');
            pressedKeys.add('ESC');
            console.log('ESC pressed');
        }

        if (keyContent === key || (keyContent === 'SPACE' && event.key === ' ')) {
            element.classList.add('active');
            pressedKeys.add(keyContent);
            console.log(keyContent + ' pressed');
        }

        if (keyContent === 'CTRL' && event.key.toLowerCase() === 'control') {
            element.classList.add('active');
            pressedKeys.add('CTRL');
            console.log('CTRL pressed');
        }
        if (keyContent === 'SHIFT' && event.key.toLowerCase() === 'shift') {
            element.classList.add('active');
            pressedKeys.add('SHIFT');
            console.log('SHIFT pressed');
        }
        if (keyContent === 'ALT' && event.key.toLowerCase() === 'alt') {
            element.classList.add('active');
            pressedKeys.add('ALT');
            console.log('ALT pressed');
        }
        if (keyContent === 'TAB' && event.key.toLowerCase() === 'tab') {
            element.classList.add('active');
            pressedKeys.add('TAB');
            console.log('TAB pressed');
        }
        if (keyContent === 'CAPS LOCK' && event.key.toLowerCase() === 'capslock') {
            element.classList.add('active');
            pressedKeys.add('CAPS LOCK');
            console.log('CAPS LOCK pressed');
        }
        if (keyContent === 'ENTER' && event.key.toLowerCase() === 'enter') {
            element.classList.add('active');
            pressedKeys.add('ENTER');
            console.log('ENTER pressed');
        }
        if (keyContent === 'BACKSPACE' && event.key.toLowerCase() === 'backspace') {
            element.classList.add('active');
            pressedKeys.add('BACKSPACE');
            console.log('BACKSPACE pressed');
        }

        if (!pressedKeys.has(keyContent) && keyContent) {
            console.log(`Key not added: ${keyContent}`);
        }
    });

    console.log(`Pressed keys: ${pressedKeys.size} out of ${totalKeys}`);

    if (pressedKeys.size === totalKeys) {
        console.log('All keys pressed! Launching confetti...');
        launchConfetti();
    }
});

function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );
    }, 250);
}
