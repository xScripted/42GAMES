module.exports = class Player {
    constructor(id) {
        this.id = id;
        this.hand = [];
    }

    hasCard(card2) {
        if (this.hand.some(card1 => card1.equal(card2))) {
            return true;
        }

        return false;
        
        /*if (this.hand.some(card.equal)) {
            return true;
        }

        return false;*/
    }

    hasCards(cards) {
        for (let card of cards) {
            if (!this.hasCard(card)) {
                return false;
            }
        }
        
        return true;
    }
}