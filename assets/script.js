const pressedKeys = new Set();
const totalKeys = 54;  
const keyboardContainer = document.querySelector('.keyboard-container');
let confettiActive = false;
let keyboardMovedDown = false;

document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    const keyElements = document.querySelectorAll('.key');

    keyElements.forEach(element => {
        let keyContent = element.textContent.trim().toUpperCase();

        
        if (keyboardMovedDown === false) {
            if (keyContent === 'ESC' && event.key === 'Escape') {
                element.classList.add('active');
                pressedKeys.add('ESC');
            }

            if (keyContent === key || (keyContent === 'SPACE' && event.key === ' ')) {
                element.classList.add('active');
                pressedKeys.add(keyContent);
            }

            if (keyContent === 'CTRL' && event.key.toLowerCase() === 'control') {
                element.classList.add('active');
                pressedKeys.add('CTRL');
            }
            if (keyContent === 'SHIFT' && event.key.toLowerCase() === 'shift') {
                element.classList.add('active');
                pressedKeys.add('SHIFT');
            }
            if (keyContent === 'ALT' && event.key.toLowerCase() === 'alt') {
                element.classList.add('active');
                pressedKeys.add('ALT');
            }
            if (keyContent === 'TAB' && event.key.toLowerCase() === 'tab') {
                element.classList.add('active');
                pressedKeys.add('TAB');
            }
            if (keyContent === 'CAPS LOCK' && event.key.toLowerCase() === 'capslock') {
                element.classList.add('active');
                pressedKeys.add('CAPS LOCK');
            }
            if (keyContent === 'ENTER' && event.key.toLowerCase() === 'enter') {
                element.classList.add('active');
                pressedKeys.add('ENTER');
            }
            if (keyContent === 'BACKSPACE' && event.key.toLowerCase() === 'backspace') {
                element.classList.add('active');
                pressedKeys.add('BACKSPACE');
            }

            console.log(`Pressed keys: ${pressedKeys.size} out of ${totalKeys}`);

            if (pressedKeys.size === totalKeys && !confettiActive) {
                console.log('All keys pressed! Launching confetti...');
                confettiActive = true;
                launchConfetti();
                setTimeout(() => {
                    stopConfetti();
                    moveKeyboardToBottom();
                }, 5000); 
            }
        }
    });
});

function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    let interval;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    interval = setInterval(function() {
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

function stopConfetti() {
    confetti.reset();
}

function moveKeyboardToBottom() {
    keyboardContainer.classList.add('move-to-bottom');
    keyboardMovedDown = true;
    setTimeout(clearKeyboardState, 1000); 
}

function clearKeyboardState() {
    const keyElements = document.querySelectorAll('.key');
    keyElements.forEach(element => {
        element.classList.remove('active');
    });

    document.addEventListener('keydown', handleKeyPressAfterMove);
}

function handleKeyPressAfterMove(event) {
    const keyElements = document.querySelectorAll('.key');

    keyElements.forEach(element => {
        const keyContent = element.textContent.trim().toUpperCase();
        if (keyContent === event.key.toUpperCase() || (keyContent === 'SPACE' && event.key === ' ')) {
            element.classList.add('active');
            setTimeout(() => {
                element.classList.remove('active');
            }, 100); 
        }
    });
}

function endTest() {
    const wpmTest = document.getElementById('wpm-test');
    const countdown = document.getElementById('countdown');
    const wpmCard = document.createElement('div');
    const lineLeft = document.createElement('div');
    const lineRight = document.createElement('div');

    wpmCard.classList.add('wpm-card');
    wpmCard.id = 'wpm-card';
    wpmCard.textContent = `WPM: ${calculateWPM()}`; 
    document.body.appendChild(wpmCard);

    lineLeft.classList.add('vertical-line', 'line-left');
    lineRight.classList.add('vertical-line', 'line-right');
    document.body.appendChild(lineLeft);
    document.body.appendChild(lineRight);

    
    wpmTest.classList.add('fade-out');
    countdown.classList.add('fade-out');

    
    setTimeout(() => {
        wpmTest.style.display = 'none';
        countdown.style.display = 'none';

        
        lineLeft.style.height = '150px';
        lineLeft.style.top = '150px';
        lineRight.style.height = '150px';
        lineRight.style.top = '150px';

        
        setTimeout(() => {
            wpmCard.style.opacity = '1';
            wpmCard.style.transform = 'translateY(-50px)';
        }, 500);
    }, 1000);
}

function calculateWPM() {
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; 
    return Math.round(typedWords / timeElapsed);
}
