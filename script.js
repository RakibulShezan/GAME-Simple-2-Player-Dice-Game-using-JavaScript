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
const btnRule = document.querySelector('.btn--rule');
const btnClose = document.querySelector('.close-modal');

const winner0 = document.querySelector('.winner--0');
const winner1 = document.querySelector('.winner--1');

let scores, currentScore, activePlayer, playing;
// Initial  condition of the page
let firstActive = 1;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  firstActive = firstActive === 1 ? 0 : 1;
  activePlayer = firstActive;
  playing = true;

  //   Initialize player scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  winner0.classList.add('hidden');
  winner1.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  if (activePlayer === 0) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
};

// Call the initialize function when the page loads
init();

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
    /* diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
 */
    // Dice rolling loading animation
    document.querySelector('.loader').classList.remove('hidden');
    document.querySelector('.sprite').classList.add('hidden');

    setTimeout(() => {
      document.querySelector('.loader').classList.add('hidden');
      // Using sprite image to reduce the number of Http requests
      document.querySelector(
        '.sprite'
      ).className = `dice sprite bg-dice_${dice}`;
      //  Check If the dice is rolled to 1
      if (dice !== 6) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }, 600);
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
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Winning message
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');

      // Firework Animation
      confetti({
        spread: 200,
        particleCount: 400,
      });
    } else {
      switchPlayer();
    }
  }
});

// Click on the NEW GAME Button
btnNew.addEventListener('click', init);

// Evenet handler for instructions

const openModal = () => {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
};

const closeModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};
btnRule.addEventListener('click', openModal);

btnClose.addEventListener('click', closeModal);

document.querySelector('.overlay').addEventListener('click', closeModal);
