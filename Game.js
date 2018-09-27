const Player = require('./Player');

module.exports = class Game {
    constructor(deck) {
        this.players = [];
        this.deck = deck;
        this.turn = 0;
    }

    join(id) {
        this.players.push(new Player(id));
    }

    deal(number = null) {
        const {players, deck} = this;

        number = number || Math.floor(deck.cards.length / players.length);

        for (let i = 0; i < number; i++) {
            for (let player of players) {
                player.hand.push(deck.cards.shift());
            }
        }
    }

    next() {
        this.lastTurn = this.turn++;
        
        if (this.turn > this.players.length) {
            this.turn = 0;
        }

        console.log(`The turn changes to ${this.players[this.turn].id}`);
    }

    move(data) {
        if (this.players[this.turn].id !== data.id) {
            console.log('Is not your turn.');

            return false;
        }

        if (!this[data.type]) {
            console.log('This move type no exists.');

            return false;
        }

        this[data.type](data);

        /*for(let player of this.players) {
            console.log(player.hand);
        }*/
    }
}

/*{
    "type": "add",
    "cards": [
        {"suit": 0, "value": 0},
        {"suit": 0, "value": 5},
        {"suit": 0, "value": 10}
    ]
}*/