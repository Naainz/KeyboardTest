const words = [
    // fruit
    "apple", "orange", "banana", "grape", "pear", "peach", "plum", "berry", "melon", "kiwi", "mango", "pineapple", "strawberry", "blueberry", "raspberry", "blackberry", "watermelon", "cantaloupe", "pomegranate",

    // animal
    "dog", "cat", "elephant", "giraffe", "lion", "tiger", "bear", "zebra", "kangaroo", "panda", "monkey", "rabbit", "deer", "horse", "dolphin", "whale", "shark", "penguin", "eagle", "falcon",

    // object
    "table", "chair", "lamp", "sofa", "carpet", "mirror", "window", "door", "bottle", "cup", "spoon", "fork", "knife", "book", "pen", "pencil", "notebook", "backpack", "clock", "phone", "computer", "television", "keyboard", "mouse", "speaker", "headphones", "camera", "printer", "monitor", "router",

    // places
    "city", "village", "mountain", "river", "ocean", "desert", "forest", "island", "beach", "park", "museum", "library", "restaurant", "cafe", "hotel", "school", "university", "hospital", "airport", "station",

    // adjective
    "quick", "slow", "happy", "sad", "bright", "dark", "light", "heavy", "soft", "hard", "sharp", "blunt", "warm", "cold", "hot", "cool", "wet", "dry", "smooth", "rough", "clean", "dirty", "strong", "weak", "new", "old", "young", "ancient", "modern", "fancy", "plain", "beautiful", "ugly",

    // verb
    "run", "walk", "jump", "sit", "stand", "read", "write", "draw", "paint", "sing", "dance", "swim", "fly", "drive", "ride", "climb", "play", "watch", "listen", "speak", "talk", "whisper", "shout", "eat", "drink", "cook", "bake", "clean", "wash", "build", "create",

    // colors
    "red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "gray", "brown", "cyan", "magenta", "violet", "indigo", "turquoise", "silver", "gold", "bronze", "ivory",

    // emotions
    "happy", "sad", "angry", "excited", "nervous", "calm", "scared", "brave", "proud", "ashamed", "jealous", "grateful", "hopeful", "fearful", "lonely", "surprised", "shocked", "relieved", "embarrassed", "confused",

    // weather
    "sunny", "cloudy", "rainy", "stormy", "snowy", "windy", "foggy", "misty", "hot", "cold", "warm", "cool", "humid", "dry", "freezing", "thunder", "lightning", "hail", "breeze", "gale",

    // nouns
    "friend", "family", "house", "car", "bicycle", "train", "airplane", "ship", "bus", "truck", "helmet", "glasses", "wallet", "purse", "ticket", "passport", "key", "lock", "ring", "bracelet", "necklace", "hat", "shoe", "sock", "glove", "belt", "scarf", "umbrella", "coat", "jacket", "shirt", "pants", "dress", "skirt", "suit", "tie", "boots", "sneakers"
];
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

        
        countdown.style.left = `${cursorPosition.left}px`;
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

function endTest() {
    const wpmTest = document.getElementById('wpm-test');
    const countdown = document.getElementById('countdown');
    const wpmContainer = document.createElement('div');

    wpmContainer.classList.add('wpm-display-container');
    wpmContainer.id = 'wpm-container';
    wpmContainer.innerHTML = `
        <div class="wpm-number">${calculateWPM()}</div>
        <div class="wpm-text">WPM</div>
    `;
    document.body.appendChild(wpmContainer);

    
    wpmTest.classList.add('fade-out');
    countdown.classList.add('fade-out');

    
    setTimeout(() => {
        wpmTest.style.display = 'none';
        countdown.style.display = 'none';

        
        wpmContainer.style.opacity = '1';
    }, 1000);
}

function calculateWPM() {
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; 
    return Math.round(typedWords / timeElapsed);
}
