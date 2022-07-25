'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Initial Look of the page
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  // switch the current player to the oposition
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Switch the background color on player switch
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice value between 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   Display the dice image matching the random generated dice value
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //  Check If the dice is rolled to 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold the current score of the player
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the total score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the player reaches to 100 score
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
