/*
 * Create a list that holds all of your cards
 */
let cardDeckHtml = document.getElementsByClassName("card");

// used spread operator to combine htmlCollection into a new Array
let cards = [...cardDeckHtml];

// deck of all cards in game
const deck = document.querySelector(".deck");

// deck of all cards in game
let moves = 0;

let counter = document.querySelector('.moves');
// set initial counter to 0
counter.innerHTML = moves;

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", /*displayCard function*/ function () {
        console.log("Card Clicked");
    });
};
// 'displayCard' is a function we'll talk about this soon...
// toggles open and show class to display cards
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame() {

    var shuffledCards = shuffle(cards);

    for (const card in shuffledCards) {
        deck.appendChild(shuffledCards[card]);
    }
}

window.onload = startGame();

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
