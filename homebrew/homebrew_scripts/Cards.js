
let count = 0;


/*This script creates a deck of 52 cards. Each card is represented as an 
object for each attribute type. To draw a card at random from the deck, press the 
spacebar and the card object will show up on the console. To make things more realistic,
every card that is drawn is removed from the deck. After 52 cards have been drawn, a new deck
will be generated and shuffled.*/


/*Select the body and add the event listener for when the user wants to select a card*/
var body = document.querySelector('body').addEventListener('keypress', event = (e) => {
    if (e.which === 32) {
        console.log(selectCard());
    }
});


/*Create the deck of cards*/
var deck = createDeck();

/*This function selects a card*/
function selectCard() {
    if (!deck.length) {
        console.log("The Deck is now empty\nPress spacebar to draw a card from a new deck.");
        deck = createDeck();
    } else {
        var idx = Math.round(Math.random() * (deck.length - 1));
        var selected = deck[idx];
        deck.splice(idx, 1);
        return selected;
    }
}


//returns an array of card objects.
function createDeck() {
    var deck = [];
    var num;
    for (var i = 1; i < 53; i++) {
        if (i <= 13) {
            deck.push({
                Suit: 'Diamonds',
                CardNum: i % 13,
                Color: 'Red'
            });
        }
        if (i > 13 && i <= 26) {
            deck.push({
                Suit: 'Hearts',
                CardNum: i % 13,
                Color: 'Red'
            });
        }
        if (i > 26 && i <= 39) {
            deck.push({
                Suit: 'Clubs',
                CardNum: i % 13,
                Color: 'Black'
            });
        }
        if (i > 39) {
            deck.push({
                Suit: 'Spades',
                CardNum: i % 13,
                Color: 'Black'
            });
        }
    }
    deck = assignCards(deck);
    return shuffle(deck);
    //return shuffleN(deck, 2);
}

/*Function assigns the face cards to the deck when the card number is 0,1,11,12*/
function assignCards(deck) {
    for (i in deck) {
        if (deck[i].CardNum === 0) {
            deck[i].CardNum = 'King';
        } else if (deck[i].CardNum === 1) {
            deck[i].CardNum = 'Ace';
        } else if (deck[i].CardNum === 11) {
            deck[i].CardNum = 'Jack';
        } else if (deck[i].CardNum === 12) {
            deck[i].CardNum = 'Queen';
        }
    }
    return deck;
}

/*Creates a new deck and picks a random number between 0 and the length of the deck.
that value is then pushed to the new array. Once the process is finished, it returns the 
shuffled deck. */
function shuffle(deck) {
    var [newDeck, random] = [
        [], 0
    ];
    for (var i = 0; i < 52; i++) {
        random = Math.round(Math.random() * (deck.length - 1));
        newDeck.push(deck[random]);
        deck.splice(random, 1);
    }
    return newDeck;
}

/*Shuffles the deck n amount of times.*/
function shuffleN(deck, n) {
    for (var i = 0; i < n; i++) {
        deck = shuffle(deck);
    }
    return deck;
}