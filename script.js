const gameBoard = (function () {
    let gameboard;
    let inPlay = false;
    let numMove = 0;

    const resetBoard = () => gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    const getBoard = () => gameboard.map(row => [...row]);
    const getNumMoves = () => numMove;

    const makeMove = (y, x, player) => {
        if (!inPlay || gameboard[y][x] !== "") return false;

        gameboard[y][x] = player;
        numMove++;
        
        return true;
    }

    const isInPlay = () => inPlay;
    const stopPlay = () => inPlay = false;
    const startPlay = () => {
        resetBoard();
        numMove = 0;
        inPlay = true;
    }

    const hasWinner = (type) => {
        const winPatterns = [
            // Rows
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
    
            // Columns
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
    
            // Diagonals
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];

        return winPatterns.some(pattern => 
            pattern.every(([y, x]) => gameboard[y][x] === type)
        );
    }

    resetBoard();

    return {makeMove, getBoard, hasWinner, getNumMoves, isInPlay, stopPlay, startPlay};
})();

const display = document.querySelector(".display");
const startButton = document.querySelector(".start-button");
const container = document.querySelector(".board-container");

var curPlayer = "X";

const updateStartButton = () => {
    startButton.textContent = gameBoard.isInPlay() ? "Restart" : "Play again";
};

const displayBoard = () => {
    container.innerHTML = "";

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let boardItem = document.createElement("BUTTON");
            boardItem.className = 'board-item';
            boardItem.onclick = () => play(y, x, boardItem)

            container.append(boardItem)
        }
    }
}

const setPlayer = (player) => {
    curPlayer = player;
    display.textContent = `${player} Turn`;
}

container.addEventListener('mouseover', e => {
    let button = e.target.closest('button');
    if (!button || button.disabled || !gameBoard.isInPlay()) { return; }

    button.textContent = curPlayer;
});

container.addEventListener('mouseout', e => {
    let button = e.target.closest('button');
    if (!button || button.disabled || !gameBoard.isInPlay()) { return; }

    button.textContent = '';
});

const play = (y, x, element) => {
    if (!gameBoard.makeMove(y, x, curPlayer)) return;

    element.textContent = curPlayer;
    element.disabled = true;

    if (gameBoard.hasWinner(curPlayer)) {
        gameBoard.stopPlay();
        updateStartButton();
        display.textContent = `${curPlayer} wins!!`;
        return;
    }

    if (gameBoard.getNumMoves() === 9) {
        gameBoard.stopPlay();
        updateStartButton();
        display.textContent = `its a tie!!`;
        return;
    }

    setPlayer(curPlayer === "X" ? "O" : "X");
}

const startGame = () => {
    gameBoard.startPlay();
    updateStartButton();
    setPlayer("X")
    displayBoard();
}

displayBoard()