const words = ["apple", "orange", "banana", "grape", "pear", "peach", "plum", "berry", "melon", "kiwi"]; 
let phrase = '';
let currentLetterIndex = 0;
let typedWords = 0;
let startTime;
let interval;
let testStarted = false; 
let typedCharacters = []; 

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
    const countdown = document.getElementById('countdown');
    phrase = generateRandomPhrase(); 
    wpmTest.classList.remove('hidden');
    currentLetterIndex = 0;
    typedWords = 0;
    startTime = null;
    testStarted = false; 
    typedCharacters = []; 
    updateWordDisplay();
    
    let timeLeft = 30;
    countdown.textContent = timeLeft;

    
    positionCountdownAboveCursor();

    
    interval = setInterval(() => {
        if (testStarted) {
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            timeLeft = 30 - timeElapsed;
            countdown.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(interval);
                endTest();
            }
        }
    }, 1000);

    document.addEventListener('keydown', handleKeyStroke);
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

        const globalIndex = i + start;

        if (globalIndex < currentLetterIndex) {
            letterSpan.classList.add(
                typedCharacters[globalIndex] === phrase[globalIndex] ? 'correct-letter' : 'incorrect-letter'
            );
        } else if (globalIndex === currentLetterIndex) {
            letterSpan.classList.add('current-letter');
            positionCountdownAboveCursor(); 
        } else {
            letterSpan.classList.add('future-letter');
        }

        wordDisplay.appendChild(letterSpan);
    }
}

function handleKeyStroke(event) {
    if (!testStarted) {
        startTime = Date.now(); 
        testStarted = true;
    }

    const typedLetter = event.key;

    if (typedLetter.length === 1 || typedLetter === ' ') {
        const currentLetter = phrase[currentLetterIndex];

        typedCharacters[currentLetterIndex] = typedLetter;

        if (typedLetter === currentLetter) {
            if (currentLetter === ' ') {
                typedWords++;
            }
        }

        currentLetterIndex++;
        updateWordDisplay();
    }

    if (currentLetterIndex >= phrase.length) {
        clearInterval(interval);
        endTest();
    }
}

function positionCountdownAboveCursor() {
    const countdown = document.getElementById('countdown');
    const currentLetter = document.querySelector('.current-letter');

    if (currentLetter) {
        const cursorPosition = currentLetter.getBoundingClientRect();
        const wordDisplayPosition = document.getElementById('word-display').getBoundingClientRect();

        
        countdown.style.left = `${cursorPosition.left + cursorPosition.width / 2}px`;
        countdown.style.top = `${cursorPosition.top - 60}px`; 
    }
}

function endTest() {
    const wpmTest = document.getElementById('wpm-test');
    const countdown = document.getElementById('countdown');

    
    wpmTest.classList.add('fade-out');
    countdown.classList.add('fade-out');

    
    setTimeout(() => {
        wpmTest.style.display = 'none';
        countdown.style.display = 'none';
    }, 1000);
}

function moveKeyboardToBottom() {
    keyboardContainer.classList.add('move-to-bottom');
    keyboardMovedDown = true;
    setTimeout(() => {
        clearKeyboardState();
        startWPMTest(); 
    }, 1000); 
}
