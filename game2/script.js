/***********************
 * GAME CONFIGURATION
 ***********************/
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

/***********************
 * GAME STATE
 ***********************/
let selectedWord = "";
let guessedLetters = [];
let wrongAttempts = 0;
let gameOver = false;

/***********************
 * DOM ELEMENTS
 ***********************/
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const wrongCountDisplay = document.getElementById("wrong-count");
const statusMessage = document.getElementById("status-message");
const restartButton = document.getElementById("restart-btn");

/* HANGMAN IMAGE ELEMENT */
const hangmanImage = document.getElementById("hangman-image");

/***********************
 * INITIALIZATION
 ***********************/
initGame();

/***********************
 * FUNCTIONS
 ***********************/

/**
 * Initializes or restarts the game
 */
function initGame() {
  selectedWord = getRandomWord();
  guessedLetters = [];
  wrongAttempts = 0;
  gameOver = false;

  statusMessage.textContent = "";
  wrongCountDisplay.textContent = wrongAttempts;

  updateHangmanImage(); // ← reset image
  renderWord();
  renderKeyboard();
}

/**
 * Select random word
 */
function getRandomWord() {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
}

/**
 * Render hidden word
 */
function renderWord() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  wordDisplay.textContent = display;
  checkWinCondition();
}

/**
 * Create on-screen keyboard
 */
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

/**
 * Handle letter guess
 */
function handleGuess(letter) {
  if (gameOver) return;

  guessedLetters.push(letter);

  if (!selectedWord.includes(letter)) {
    wrongAttempts++;
    wrongCountDisplay.textContent = wrongAttempts;

    updateHangmanImage(); // ← IMAGE PROGRESSION HAPPENS HERE
    checkLoseCondition();
  }

  renderWord();
  renderKeyboard();
}

/**
 * ==========================
 * HANGMAN IMAGE PROGRESSION
 * ==========================
 * Updates image based on wrongAttempts
 */
function updateHangmanImage() {
  hangmanImage.src = `hangman-${wrongAttempts}.png`;
  
}

/**
 * Win condition
 */
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

/**
 * Lose condition
 */
function checkLoseCondition() {
  if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
    statusMessage.textContent = `💀 You Lost! Word was: ${selectedWord}.        Just noob things lol.`;
    gameOver = true;
    disableKeyboard();
  }
}

/**
 * Disable keyboard
 */
function disableKeyboard() {
  keyboard.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
  });
}

/***********************
 * EVENTS
 ***********************/
restartButton.addEventListener("click", initGame);
