const Deck = require('./Deck');
const SpanishCard = require('./SpanishCard');

module.exports = class SpanishDeck extends Deck {
    constructor() {
        super();

        for (let suit = 0; suit < 4; suit++) {
            for (let value = 0; value < 12; value++) {
                this.cards.push(new SpanishCard(suit, value));
            }
        }
    }
}