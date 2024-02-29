
let head = document.getElementById('head');
let btn = document.getElementById('btn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_TEXT = "O";
const X_TEXT = "X";
let currentplayer = X_TEXT;
let spaces = Array(9).fill(null);
let playerText = 'Tic Tac Toe';

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentplayer;
        e.target.innerText = currentplayer;

        if (playerHasWon() !== false) {
            playerText = `${currentplayer} has won!`;
            let winningBlocks = playerHasWon();
            
            winningBlocks.forEach(box => boxes[box].style.backgroundColor = winnerIndicator);
            
            // Display the player win message
            head.innerText = playerText;

            // Remove the click event listeners after a player has won
            boxes.forEach(box => box.removeEventListener('click', boxClicked));

            return;
        }

        currentplayer = currentplayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

btn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    // Reset player text
    playerText = 'Tic Tac Toe';
    head.innerText = playerText;

    // Add click event listeners back after restarting
    boxes.forEach(box => box.addEventListener('click', boxClicked));

    currentplayer = X_TEXT;
}

startGame();
