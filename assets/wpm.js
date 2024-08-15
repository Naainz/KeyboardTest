const words = ["apple", "orange", "banana", "grape", "pear", "peach", "plum", "berry", "melon", "kiwi"]; 
let phrase = '';
let currentLetterIndex = 0;
let typedWords = 0;
let startTime;
let interval;


function generateRandomPhrase() {
    let phraseArray = [];
    for (let i = 0; i < 150; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        phraseArray.push(randomWord);
    }
    return phraseArray.join(' ');
}

function startWPMTest() {
    const wpmTest = document.getElementById('wpm-test');
    const wordDisplay = document.getElementById('word-display');
    const wpmDisplay = document.getElementById('wpm-display');

    phrase = generateRandomPhrase(); 
    wpmTest.classList.remove('hidden');
    currentLetterIndex = 0;
    typedWords = 0;
    startTime = null;
    updateWordDisplay();
    
    document.addEventListener('keydown', handleKeyStroke);

    
    interval = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000; 
        if (timeElapsed >= 30) {
            clearInterval(interval);
            document.removeEventListener('keydown', handleKeyStroke);
            const wpm = Math.round((typedWords / timeElapsed) * 60);
            wpmDisplay.textContent = `WPM: ${wpm}`;
        }
    }, 100);
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';

    const start = Math.max(0, currentLetterIndex - 10);
    const end = Math.min(phrase.length, currentLetterIndex + 10);
    const visiblePhrase = phrase.substring(start, end);

    for (let i = 0; i < visiblePhrase.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = visiblePhrase[i];
        letterSpan.classList.add('letter');

        if (i + start < currentLetterIndex) {
            letterSpan.classList.add(phrase[i + start] === visiblePhrase[i] ? 'correct-letter' : 'incorrect-letter');
        } else if (i + start === currentLetterIndex) {
            letterSpan.classList.add('current-letter');
        } else {
            letterSpan.classList.add('future-letter');
        }

        wordDisplay.appendChild(letterSpan);
    }
}

function handleKeyStroke(event) {
    if (!startTime) {
        startTime = Date.now(); 
    }

    const typedLetter = event.key;

    if (typedLetter.length === 1) {
        if (typedLetter === phrase[currentLetterIndex]) {
            currentLetterIndex++;
            if (typedLetter === ' ') {
                typedWords++;
            }
        } else {
            currentLetterIndex++;
        }
        updateWordDisplay();
    }

    
    if (currentLetterIndex >= phrase.length) {
        clearInterval(interval);
        document.removeEventListener('keydown', handleKeyStroke);
        const timeElapsed = (Date.now() - startTime) / 1000;
        const wpm = Math.round((typedWords / timeElapsed) * 60);
        document.getElementById('wpm-display').textContent = `WPM: ${wpm}`;
    }
}


function moveKeyboardToBottom() {
    keyboardContainer.classList.add('move-to-bottom');
    keyboardMovedDown = true;
    setTimeout(() => {
        clearKeyboardState();
        startWPMTest(); 
    }, 1000); 
}
