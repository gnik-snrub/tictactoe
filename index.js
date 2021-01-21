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
    let board = []
    const getBoard = (id) => board[id]

    const init = () => {
        board =[null, null, null,
                null, null, null,
                null, null, null]
    }

    const turnTaken = (id) => {
        if (board[id] != null) {
            return
        } else {
            board[id] = gameflow.getState()
            winCheck();
            gameflow.changeTurn()
            display.update()
        }
    }

    const winCheck = () => {
        const winStates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (i = 0; i < winStates.length; i++) {
            let winPosOne = winStates[i][0]
            let winPosTwo = winStates[i][1]
            let winPosThree = winStates[i][2]
            if (`${getBoard(winPosOne)}${getBoard(winPosTwo)}${getBoard(winPosThree)}` == "xxx") {
                console.log("X is da winner")
            } else if (`${getBoard(winPosOne)}${getBoard(winPosTwo)}${getBoard(winPosThree)}` == "ooo") {
                console.log("O is da winner")
            }
        }
    }

    return {init, getBoard, turnTaken}
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

            // Adds listener to square to detect a player clicking on it
            square.addEventListener('click', function() { gameboard.turnTaken(square.getAttribute('data-value')) });
    
            // Adds element to grid
            grid.appendChild(square)
        }
    }
    return {update}
})();

function setup() {
    gameflow.init();
    gameboard.init();
    display.update();
}

setup();


// Check for wins
// Flesh out UI
// - Congrats to the winner
// - Allow players to input names
// - Start / Restart buttons
