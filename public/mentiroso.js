const socket = io();

document.addEventListener('DOMContentLoaded', event => {
    socket.emit('start');

    document.getElementById('create')
        .addEventListener('click', event => socket.emit('create'));
        
    document.getElementById('join')
        .addEventListener('click', event => socket.emit('join'));

    document.getElementById('add')
        .addEventListener('click', handleAdd);
        
    document.getElementById('liftUp')
        .addEventListener('click', handleLiftUp);
    

    socket.on('deal', data => {
        const h2PlayerId = document.getElementById('playerId');
        const h2Turn = document.getElementById('turn');

        h2PlayerId.textContent += socket.id;
        h2Turn.textContent += data.turn;

        const br = document.createElement('br');
        document.body.appendChild(br);

        for (let card of data.cards) {
            const div = document.createElement('div');
            const text = document.createTextNode(`
                Suit: ${card._suit}
                Value: ${card._value}
            `);

            div.suit = card._suit;
            div.value = card._value;
            div.addEventListener('click', handleSelect);

            div.classList.add('card');
            
            div.appendChild(text);
            document.body.appendChild(div);
        }
    });
    
    socket.on('move', data => {
        console.log('io emit move');

        updateTurn(data.turn);

        console.log(data.cards);

        [...document.querySelectorAll('.card')]
            .forEach(card => card.parentNode.removeChild(card));
        
        for (let card of data.cards) {
            const div = document.createElement('div');
            const text = document.createTextNode(`
                Suit: ${card._suit || card.suit}
                Value: ${card._value || card.value}
            `);

            div.suit = card._suit || card.suit;
            div.value = card._value || card.value;
            div.addEventListener('click', handleSelect);

            div.classList.add('card');
            
            div.appendChild(text);
            document.body.appendChild(div);
        }
    });
});

const handleSelect = event => {
    event.target.classList.toggle('select');
}

const handleAdd = event => {
    const cards = [...document.querySelectorAll('.card.select')]
        .map(div => ({suit: div.suit, value: div.value}));
    const value = document.getElementById('value').value;

    socket.emit('move', {
        type: 'add',
        value: value,
        cards: cards
    });
}

const handleLiftUp = event => {
    socket.emit('move', {
        type: 'liftUp'
    });
}

const updateTurn = turn => {
    document.getElementById('turn').textContent = `Turn: ${turn}`;

}