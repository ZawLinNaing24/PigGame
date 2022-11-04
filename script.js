'use strict';

// *****Player-1*****
const score0El = document.querySelector('#score--0');
const current0El = document.getElementById('current--0');
const player0El = document.querySelector('.player--0');

// *****Player-2*****
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const player1El = document.querySelector('.player--1');
//***************** */

const diceEl = document.querySelector('.dice');
// console.log(diceEl);

// ***** Buttons *****
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    diceEl.classList.add('hidden');
};
init();
// Switching Player Function
const swichPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', () => {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    if (playing) {
        if (dice !== 1) {
            diceEl.src = `dice-${dice}.png`;
            diceEl.classList.remove('hidden');
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            swichPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 10) {
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--active');
            playing = false;
            diceEl.classList.add('hidden');
        } else {
            swichPlayer();
        }
    }
});

btnNew.addEventListener('click', init);