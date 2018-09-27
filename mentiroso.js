const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MentirosoGame = require('./MentirosoGame');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/mentiroso.html');
});

io.on('connection', function(socket) {
    socket.on('create', handleCreate);
    socket.on('join', handleJoin)
    socket.on('move', handleMove);
});

http.listen(3000, () => 'Server running!');

let game;

const handleCreate = function(data) {
    const socket = this;

    game = new MentirosoGame();

    socket.join('room');
    game.join(socket.id);

    console.log(`Player ${socket.id} create a game.`);
    console.log(`Player ${socket.id} join a game.`);
}

const handleJoin = function(data) {
    const socket = this;

    socket.join('room');
    game.join(socket.id);

    console.log(`Player ${socket.id} join a game.`);

    if (game.players.length === 3) {
        handleStart();
        console.log('The game starts.');
    }
}

const handleStart = function() {
    game.deck.shuffle();
    game.deal();

    const turn = game.players[game.turn].id

    for (player of game.players) {
        io.to(player.id).emit('deal', {
            cards: player.hand,
            turn: turn
        });
    }
}

const handleMove = function(data) {
    const socket = this;

    data.id = socket.id;

    game.move(data);

    const turn = game.players[game.turn].id

    for (player of game.players) {
        io.to(player.id).emit('move', {
            cards: player.hand,
            turn: turn
        });
    }
}