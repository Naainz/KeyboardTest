document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    const keyElements = document.querySelectorAll('.key');

    keyElements.forEach(element => {
        let keyContent = element.textContent.trim().toUpperCase();

        
        if (keyContent === 'ESC' && event.key.toLowerCase() === 'escape') {
            element.classList.add('active');
        }

        if (keyContent === key || (keyContent === 'SPACE' && event.key === ' ')) {
            element.classList.add('active');
        }

        
        if (keyContent === 'CTRL' && event.key.toLowerCase() === 'control') {
            element.classList.add('active');
        }
        if (keyContent === 'SHIFT' && event.key.toLowerCase() === 'shift') {
            element.classList.add('active');
        }
        if (keyContent === 'ALT' && event.key.toLowerCase() === 'alt') {
            element.classList.add('active');
        }
        if (keyContent === 'TAB' && event.key.toLowerCase() === 'tab') {
            element.classList.add('active');
        }
        if (keyContent === 'CAPS LOCK' && event.key.toLowerCase() === 'capslock') {
            element.classList.add('active');
        }
        if (keyContent === 'ENTER' && event.key.toLowerCase() === 'enter') {
            element.classList.add('active');
        }
        if (keyContent === 'BACKSPACE' && event.key.toLowerCase() === 'backspace') {
            element.classList.add('active');
        }
    });
});
