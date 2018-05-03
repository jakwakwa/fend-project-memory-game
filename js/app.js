/*
 * Create a list that holds all of your cards
 */
let cardDeckHtml = document.getElementsByClassName("card");

/* 
 * used spread operator to combine htmlCollection into a new Array
 */
let cards = [...cardDeckHtml];

// deck of all cards in game
const deck = document.querySelector(".deck");

// deck of all cards in game
let moves = 0;
let starNumber = 3;

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

let counter = document.querySelector('.moves');

// set initial counter to 0
counter.innerHTML = moves;

// array for opened cards
let openedCards = [];

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// play again button
const playAgainBtn = document.getElementById('play-again');

// restart button
const restartBtn = document.getElementById('restart');

// get modal element
const modal = document.getElementById('modal');

// set initial modal display to 'none'
modal.style.display = 'none';

// display the card's symbol --> toggles open and show class to display cards
const displayCard = function () {
    this.classList.add("open", "show", "disabled");
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - resets moves to 0
 *   - reset rating (stars = 3)
 */
function startGame() {

    var shuffledCards = shuffle(cards);

    for (var i = 0; i < shuffledCards.length; i++) {
        // deck.innerHTML = "";
        deck.appendChild(shuffledCards[i]);
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.display = "inline";
    }

    //reset timer
    var timer = document.getElementById('timer');
    timer.innerHTML = "0 mins 0 secs";

    clearInterval(interval);


}

window.onload = startGame();

function moveCounter() {

    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    // setting rates based on moves
    if (moves > 15 && moves < 20) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.display = "none";
            }
        }
        starNumber = 2;
    }
    else if (moves > 20) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.display = "none";
            }
        }
        starNumber = 1;
    }
}

//game timer
var second = 0, minute = 0;
var timer = document.getElementById('timer');
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

//  add the card to a *list* of "open" cards and check if cards are match or not
function cardOpen() {

    openedCards.push(this);

    let arrLength = openedCards.length;

    // if the list already has another card
    if (arrLength === 2) {
        // increment the move counter and display it on the page
        moveCounter();
        // checks to see if two cards match (eg. "leaf === "leaf" = true )"
        if (openedCards[0].type === openedCards[1].type) {
            // if the cards do match, lock the cards in the open position
            matched();
        } else {
            // if the cards do not match, remove the cards from the list and hide the card's symbol
            unmatched();
        }
    }
};

// when cards match, then add and remove classes
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

// when cards don't match, then add classes and remove classes after a second
function unmatched() {

    openedCards[0].classList.add("no-match");
    openedCards[1].classList.add("no-match");

    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-match", "disabled");
        openedCards[1].classList.remove("show", "open", "no-match", "disabled");
        openedCards = [];
    }, 1000);
}

// if all cards have matched, display a message with the final score
function popupMessage() {

    if (matchedCard.length === cards.length) {

        // stop and capture final time
        clearInterval(interval);
        let finalTime = timer.innerHTML;

        // show modal
        modal.style.display = 'inline';
        const modalMoves = document.getElementById('finalMove');
        const modalRatings = document.getElementById('starRating');
        const modalTime = document.getElementById("totalTime");

        modalTime.innerHTML = finalTime;
        modalMoves.textContent = moves;
        modalRatings.textContent = starNumber;
    }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
    cards[i].addEventListener("click", cardOpen);
    cards[i].addEventListener("click", popupMessage);
};

// closes modal and game restarts
playAgainBtn.addEventListener("click", function () {
    modal.style.display = 'none';
    startGame();
});

// resets the cards and re-shuffles them
restartBtn.addEventListener("click", function () {
    startGame();
});