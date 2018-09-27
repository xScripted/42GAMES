const Game = require('./Game');
const SpanishDeck = require('./SpanishDeck')

module.exports = class MentirosoGame extends Game {
    constructor() {
        super(new SpanishDeck());

        this.heap = [];
        this.currentValue;
        this.throwedCards; 
    }    

    add(data) {
        if (data.cards.length < 1 || data.cards.length > 3) {
            console.log('Cant add more than 3 cards.');

            return false;
        }

        if (!this.players[this.turn].hasCards(data.cards)) {
            console.log('Cant add cards than you dont have.');

            return false;
        }

        if (this.heap.length === 0) {
            this.currentValue = parseInt (data.value);            
        }

        this.heap = this.heap.concat(data.cards);
        this.throwedCards = data.cards;

        const hand = this.players[this.turn].hand;

        for (let card2 of data.cards) {
            hand.splice(hand.findIndex(card1 => card1.equal(card2)), 1);
        }

        console.log(this.heap);
        
        this.next();
    }

    liftUp(data) {
        console.log('Lifting up the cards.');

        if (this.throwedCards.every(card => card.value === this.currentValue)) {
            this.players[this.turn].hand = this.players[this.turn].hand.concat(this.heap);
            this.heap = [];
            this.next();
        }

        this.players[this.lastTurn].hand = this.players[this.lastTurn].hand.concat(this.heap);
        this.heap = [];
    }
}
