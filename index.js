const Player = (name) => {
    const getName = () => name;

    const takeTurn = (id) => {
        gameboard.setBoard(id, name);
    }

    return {getName, takeTurn}
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
    let board = [];
    const getBoard = (id) => board[id];
    const setBoard = (id, tag) => board[id] = tag;

    const init = () => {
        board =[null, null, null,
                null, null, null,
                null, null, null]
    }

    return {init, getBoard, setBoard}
})();

const display = (() => {
    const grid = document.querySelector(".grid-container")

    const update = () => {
        //Clears grid
        while (grid.lastElementChild) {
            grid.removeChild(grid.lastElementChild);
        }

        // Populates grid
        for (i = 0; i < 9; i++) {
            // Creates grid element
            const square = document.createElement('div')
            square.classList.add('grid-element')
            square.setAttribute('data-value', i);
    
            // Decides to display an X/O depending on the gameboard array
            if (gameboard.getBoard(i) == "x") {
                square.textContent = "X"
            } else if (gameboard.getBoard(i) == "o") {
                square.textContent = "O"
            }
    
            // Adds element to grid
            grid.appendChild(square)
        }
    }
    return {update}
})();

let xPlayer;
let oPlayer;

function setup() {
    gameflow.init();
    gameboard.init();
    xPlayer = Player("x");
    oPlayer = Player("o");
    display.update();
}

setup();
