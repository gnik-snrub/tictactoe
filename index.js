const Player = (name) => {
    const getName = () => name;
    return {getName}
}

const gameflow = (() => {
    let xturn;
    let oturn;
    const init = () => {
        xturn = true;
        oturn = false;
    }
    const getState = () => {
        if (xturn == true && oturn == false) {
            return "x"
        } else if (xturn == false && oturn == true) {
            return "o"
        }
    };

    const changeTurn = () => {
        if (xturn == true && oturn == false) {
            xturn = false
            oturn = true
        } else if (xturn == false && oturn == true) {
            xturn = true
            oturn = false
        }
    }

    return {init, getState, changeTurn}
})();

const gameboard = (() => {
    const board = [null, null, null, null, null, null, null, null, null]
    return {board}
})();

const display = (() => {
    const grid = document.querySelector(".grid-container")
    const update = () => {
        for (i = 0; i < 9; i++) {
            const square = document.createElement('div')
            square.classList.add('grid-element')
            square.setAttribute('data-value', i);
    
            if (gameboard.board[i] == "x") {
                square.textContent = "X"
            } else if (gameboard.board[i] == "o") {
                square.textContent = "O"
            }
    
            grid.appendChild(square)
        }
    }
    return {update}
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

display.update();