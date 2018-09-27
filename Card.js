module.exports = class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get suit() {
        return this._suit;
    }

    set suit(suit) {
        this._suit = suit;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    equal(card) {
        if (this._suit === card.suit && this._value === card.value) {
            return true;
        }

        return false;
    }
}