'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const resultText0 = player0El.querySelector('.result-text');
const resultText1 = player1El.querySelector('.result-text');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
    // Reset result texts
  resultText0.classList.add('hidden');
  resultText1.classList.add('hidden');
  player0El.classList.remove('player--loser');
  player1El.classList.remove('player--loser');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
  playing = false;
  diceEl.classList.add('hidden');

  // Winner
  const winnerEl = document.querySelector(`.player--${activePlayer}`);
  winnerEl.classList.add('player--winner');
  winnerEl.classList.remove('player--active');

  // Loser
  const loserPlayer = activePlayer === 0 ? 1 : 0;
  const loserEl = document.querySelector(`.player--${loserPlayer}`);
  loserEl.classList.add('player--loser');

  // Set overlay texts
  if (activePlayer === 0) {
    resultText0.textContent = 'Player 1 has won';
    resultText0.classList.remove('hidden');

    resultText1.textContent = 'You lost, lol';
    resultText1.classList.remove('hidden');
  } else {
    resultText1.textContent = 'Player 2 has won';
    resultText1.classList.remove('hidden');

    resultText0.textContent = 'You lost, lol';
    resultText0.classList.remove('hidden');
  }
  }
 else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);