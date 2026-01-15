const WORD_LIST = [
  "javascript",
  "hangman",
  "frontend",
  "browser",
  "developer",
  "function",
  "variable",
  "object",
  "codechef",
  "dakshin",
  "vitchennai"
];

const MAX_WRONG_ATTEMPTS = 6;
let selectedWord = "";
let guessedLetters = [];
let wrongAttempts = 0;
let gameOver = false;

const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const wrongCountDisplay = document.getElementById("wrong-count");
const statusMessage = document.getElementById("status-message");
const restartButton = document.getElementById("restart-btn");

const hangmanImage = document.getElementById("hangman-image");

initGame();

function initGame() {
  selectedWord = getRandomWord();
  guessedLetters = [];
  wrongAttempts = 0;
  gameOver = false;

  statusMessage.textContent = "";
  wrongCountDisplay.textContent = wrongAttempts;

  updateHangmanImage();
  renderWord();
  renderKeyboard();
}


function getRandomWord() {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
}


function renderWord() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  wordDisplay.textContent = display;
  checkWinCondition();
}


function renderKeyboard() {
  keyboard.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement("button");

    button.textContent = letter;
    button.disabled = guessedLetters.includes(letter) || gameOver;
    button.addEventListener("click", () => handleGuess(letter));

    keyboard.appendChild(button);
  }
}


function handleGuess(letter) {
  if (gameOver) return;

  guessedLetters.push(letter);

  if (!selectedWord.includes(letter)) {
    wrongAttempts++;
    wrongCountDisplay.textContent = wrongAttempts;

    updateHangmanImage(); 
    checkLoseCondition();
  }

  renderWord();
  renderKeyboard();
}


function updateHangmanImage() {
  hangmanImage.src = `hangman-${wrongAttempts}.png`;
  
}


function checkWinCondition() {
  const won = selectedWord
    .split("")
    .every(letter => guessedLetters.includes(letter));

  if (won) {
    statusMessage.textContent = "🎉 You Win!";
    gameOver = true;
    disableKeyboard();
  }
}


function checkLoseCondition() {
  if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
    statusMessage.textContent = `💀 You Lost! Word was: ${selectedWord}.        Just noob things lol.`;
    gameOver = true;
    disableKeyboard();
  }
}

function disableKeyboard() {
  keyboard.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
  });
}

restartButton.addEventListener("click", initGame);
