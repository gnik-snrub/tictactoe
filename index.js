const Player = (name) => {
    const getName = () => name;
    return {getName}
}

const gameflow = (() => {
    return {}
})();

const gameboard = (() => {
    const board = []
    return {board}
})();

function setup() {
    gameboard.board.push("x");
    gameboard.board.push("o");
    gameboard.board.push("o");
    gameboard.board.push("x");
    gameboard.board.push("o");
    gameboard.board.push("x");
    gameboard.board.push("o");
    gameboard.board.push("x");
    gameboard.board.push("x");
}

setup();

const display = (() => {
    const grid = document.querySelector(".grid-container")
    console.log(gameboard)
    for (i = 0; i < 9; i++) {
        const square = document.createElement('div')
        square.classList.add('grid-element')
        console.log(gameboard)
        console.log(gameboard.board)

        if (gameboard.board[i] == "x") {
            square.textContent = "X"
        } else if (gameboard.board[i] == "o") {
            square.textContent = "O"
        }

        grid.appendChild(square)
    }
})();