"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const pokemonNumber = document.getElementById("pokemonNumber");
const success = document.getElementById("gameSuccess");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
let dice;
console.log(pokemonNumber.textContent);

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

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  console.log(dice, activePlayer);
  if (activePlayer == 1 && dice != 1) {
    setTimeout(function () {
      btnRoll.click();
    }, 1000);
    setTimeout(function () {
      btnRoll.click();
    }, 1000);
    setTimeout(function () {
      btnHold.click();
    }, 1000);
  }
  if (activePlayer == 1 && dice == 1) {
    setTimeout(function () {
      btnRoll.click();
    }, 1000);
    setTimeout(function () {
      btnHold.click();
    }, 1000);
  }

  if (activePlayer == 0 && dice == 1) {
    activePlayer = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }

  // if (activePlayer == 0 && dice == 1) {
  //   setTimeout(btnRoll.click(), 5000);
  //   setTimeout(btnRoll.click(), 5000);
  //   setTimeout(btnHold.click(), 5000);
  // }
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./asset/dice/dice-${dice}.png`;

    console.log(dice, activePlayer);
    // if (dice == 1 && activePlayer == 0) {
    //   dice += 1;
    //   diceEl.src = `dice-${dice + 1}.png`;
    // }

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      diceEl.src = `./asset/dice/dice-${1}.png`;

      setTimeout(switchPlayer, 300);
    }
  }
});
let firstLevelRoute = $(location).attr("pathname");
firstLevelRoute = firstLevelRoute.substring(
  0,
  firstLevelRoute.lastIndexOf("/")
);
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 30) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      // ---------- win the game show the detail page button
      if (activePlayer == 0) {
        success.href =
          location.protocol +
          firstLevelRoute +
          "/details.php?event=" +
          pokemonNumber.textContent;
        success.classList.remove("hidden");
      }

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

function openModal() {
  $("#gameModal").show();
  $(".modalBackground").show();
}

function closeModal() {
  $("#gameModal").hide();
  $(".modalBackground").hide();
}

document.onload = openModal;

$(".closeGameModal").click(function () {
  closeModal();
});
$(".modalBackground").click(function () {
  closeModal();
});
