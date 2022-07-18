'use strict';

//Select all needed elements
const elScore01 = document.getElementById('score--0');
const elScore02 = document.getElementById('score--1');
const elDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current01El = document.getElementById('current--0');
const current02El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentPlayer, currentScore, playing;

const startGame = function(){
    //Assign 0 scores and hidden dice at start
    elScore01.textContent = 0;
    elScore02.textContent = 0;
    elDice.classList.add('hidden');

    //Set current player and score
    scores = [0,0];
    currentPlayer = 0;
    currentScore = 0;
    playing = true;

    elScore01.textContent = 0;
    elScore02.textContent = 0;
    current01El.textContent = 0;
    current02El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

startGame();

const changePlayer = function(){
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
        currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
        if (currentPlayer === 0 ) {
            player1El.classList.remove('player--active');
            player0El.classList.add('player--active');
        }else{
            player0El.classList.remove('player--active');
            player1El.classList.add('player--active');
        }
        currentScore = 0;
};

//Dice rolling functionality
btnRoll.addEventListener('click', function(){
    if (playing) {
        //Here we generate random number from 1 to 6
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Remove hidden class from dice
        elDice.classList.remove('hidden');
        //Add generated dice number picture to src
        elDice.src = `dice-${dice}.png`
    
        //Check rolled dice
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else{
            //Switch to next player
            changePlayer();
        }
    }
});

//Logic to add current score to players final score if hold button is pressed
btnHold.addEventListener('click', function(){
    if (playing) {
        //Add current score to active players score
        scores[currentPlayer] += currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];
        //Check if active players score is higher than 40
        if (scores[currentPlayer] >= 40) {
            //Finish game
            playing = false;
            elDice.classList.add('hidden');
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
        }else{
            //Switch player if score is less than 40
            changePlayer();
        }
    }
});

//Start new game on button click
btnNew.addEventListener('click', startGame);