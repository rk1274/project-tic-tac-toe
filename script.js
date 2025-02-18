const gameBoard = (function () {
    const gameboard = [["", "" ,""],["","",""],["","",""]]

    const playCross = (y, x) => gameboard[y][x] = "x"
    const playCircle = (y, x) => gameboard[y][x] = "o"
    
    const getBoard = () => gameboard

    const checkWin = (type) => {
        for (let i = 0; i < 3; i++) {
            if (gameboard[0][i] === type && gameboard[1][i] === type && gameboard[2][i] === type) {
                return true
            }

            if (gameboard[i][0] === type && gameboard[i][1] === type && gameboard[i][2] === type) {
                return true
            }
        }

        if (gameboard[0][0] === type && gameboard[1][1] === type && gameboard[2][2] === type) {
            return true
        }

        if (gameboard[0][2] === type && gameboard[1][1] === type && gameboard[2][0] === type) {
            return true
        }

        return false
    }

    return {playCross, playCircle, getBoard, checkWin};
})();

var curPlayer = "x";

const displayBoard = () => {
    const container = document.querySelector(".board-container");

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let boardItem = document.createElement("BUTTON");
            boardItem.className = 'board-item';
            boardItem.onclick = () => play(y, x, boardItem)

            container.append(boardItem)
        }
    }

}

const play = (y, x, element) => {
    if (curPlayer === "o") {
        gameBoard.playCircle(x,y);

        element.textContent = "o";

        curPlayer = "x";

        element.disabled = "disabled";
        return
    }

    gameBoard.playCross(x,y);

    element.textContent = "x";

    curPlayer = "o";

    element.disabled = "disabled";
}

displayBoard()