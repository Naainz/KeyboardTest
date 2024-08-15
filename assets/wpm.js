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
    phrase = generateRandomPhrase(); 
    console.log("Generated phrase:", phrase); 
    wpmTest.classList.remove('hidden');
    currentLetterIndex = 0;
    typedWords = 0;
    startTime = null;
    testStarted = false; 
    typedCharacters = []; 
    updateWordDisplay();
    
    document.addEventListener('keydown', handleKeyStroke);
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';

    
    const start = Math.max(0, currentLetterIndex - 10);
    const end = Math.min(phrase.length, currentLetterIndex + 10);
    const visiblePhrase = phrase.substring(start, end);

    console.log("Current display:", visiblePhrase); 

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
        } else {
            letterSpan.classList.add('future-letter');
        }

        wordDisplay.appendChild(letterSpan);
    }
}

function handleKeyStroke(event) {
    if (!testStarted) {
        startTime = Date.now(); 
        console.log("Typing started at:", startTime); 
        testStarted = true;

        
        interval = setInterval(() => {
            const timeElapsed = (Date.now() - startTime) / 1000; 
            if (timeElapsed >= 30) {
                clearInterval(interval);
                document.removeEventListener('keydown', handleKeyStroke);
                const wpm = Math.round((typedWords / timeElapsed) * 60);
                document.getElementById('wpm-display').textContent = `WPM: ${wpm}`;
                console.log("Test completed. Final WPM:", wpm); 
            }
        }, 100);
    }

    const typedLetter = event.key;
    console.log("User typed:", typedLetter); 

    if (typedLetter.length === 1 || typedLetter === ' ') {
        const currentLetter = phrase[currentLetterIndex];
        console.log("Expected letter:", currentLetter); 

        
        typedCharacters[currentLetterIndex] = typedLetter;

        if (typedLetter === currentLetter) {
            if (currentLetter === ' ') {
                typedWords++;
            }
        }

        currentLetterIndex++;
        console.log("currentLetterIndex updated to:", currentLetterIndex); 

        updateWordDisplay();
    }

    
    if (currentLetterIndex >= phrase.length) {
        console.log("Reached end of phrase. Final currentLetterIndex:", currentLetterIndex); 
        clearInterval(interval);
        document.removeEventListener('keydown', handleKeyStroke);
        const timeElapsed = (Date.now() - startTime) / 1000;
        const wpm = Math.round((typedWords / timeElapsed) * 60);
        document.getElementById('wpm-display').textContent = `WPM: ${wpm}`;
        console.log("Reached end of phrase. Final WPM:", wpm); 
    }
}

function markLetter(className) {
    const wordDisplay = document.getElementById('word-display');
    const letterSpan = wordDisplay.children[currentLetterIndex - Math.max(0, currentLetterIndex - 10)];
    letterSpan.className = 'letter ' + className;
    console.log("Marked letter as:", className); 
}


function moveKeyboardToBottom() {
    keyboardContainer.classList.add('move-to-bottom');
    keyboardMovedDown = true;
    setTimeout(() => {
        clearKeyboardState();
        startWPMTest(); 
    }, 1000); 
}
