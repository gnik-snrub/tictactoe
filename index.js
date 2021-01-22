// Player Object Factory.
const Player = (name) => {
    const getName = () => name;
    return {getName}
}

const gameflow = (() => {
    // Empty turn variables, which are established in the init function, checked on player click, and changed between turns.
    let xturn
    let oturn
    
    // Function to establish "X" as the first player
    const init = () => {
        xturn = true;
        oturn = false;
    }

    // Used to detect whose turn is currently taking place
    const getState = () => {
        if (xturn == true && oturn == false) {
            return "x"
        } else if (xturn == false && oturn == true) {
            return "o"
        }
    };

    // Alternates player turns
    const changeTurn = () => {
        if (xturn == true && oturn == false) {
            xturn = false
            oturn = true
        } else if (xturn == false && oturn == true) {
            xturn = true
            oturn = false
        }
    }

    // When a win or tie has occurred, this function is run to create a popup display with the relevant information
    const createWinnerPopup = (winner) => {
        // Creates empty elements
        const overlay = document.createElement('div')
        const popup = document.createElement('div')
        const page = document.querySelector('body')

        // Joins the elements to their relevant styling
        overlay.classList.add('overlay')
        popup.classList.add('popup')

        // If there is no winner, a tie is to be declared
        if (winner == false) {
            popup.textContent = `It's a tie.
(Click anywhere to continue)`
            overlay.appendChild(popup)
            overlay.addEventListener('click', () => { resetGame(overlay); })
            page.appendChild(overlay)
        // Otherwise, a Player.getName() is passed into a string template, which declares a winner.
        } else {
            popup.textContent = `${winner} is the winner!
They win a prize of nothing~
(Click anywhere to continue)`
            overlay.appendChild(popup)
            console.log(winner)
            overlay.addEventListener('click', () => { resetGame(overlay); })
            page.appendChild(overlay)
        }

    }

    // Removes the overlay, resets the turn order, and returns the game to its original state.
    const resetGame = (overlay) => {
        pageLoad()
        xturn = undefined
        oturn = undefined
        overlay.remove()
    }

    return {init, getState, changeTurn, createWinnerPopup, playerX, playerO}
})();

const gameboard = (() => {
    // Creates empty board
    let board = []
    // Returns the contents of a specified address in the board array
    const getBoard = (id) => board[id]

    // Creates player variables, which are populated with a name in the init() function
    let playerX
    let playerO

    const init = () => {
        // Board is populated with nulls, which are replaced with "x" or "o" on player clicks.
        board =[null, null, null,
                null, null, null,
                null, null, null]

                // Player name inputs are checked, and names are collected. If empty, they default to "X" and "O"
                const playerXName = document.getElementById('playerX').value || "X"
                const playerOName = document.getElementById('playerO').value || "O"
        
                // Create Player objects containing the relevant names
                playerX = Player(playerXName)
                playerO = Player(playerOName)
    }

    // Receives a gridelement id, which correlates with a position in the gameboard.board array
    const turnTaken = (id) => {
        // If board position has been taken, do nothing.
        if (board[id] != null) {
            return
        // Otherwise
        } else {
            // Check the gameflow to see whose turn is taking place
            board[id] = gameflow.getState()
            // Check to see if a win has occurred
            winCheck();
            // Change the gameflow to the other players turn
            gameflow.changeTurn()
            // Re-render the grid
            display.update()
        }
    }

    const winCheck = () => {
        // Array containing board win conditions
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

        // Iterates through above array
        for (i = 0; i < winStates.length; i++) {
            // If, when compared to the current board, a winstate shows three consecutive "o"s or "x"s, a win hsa taken place.
            let winPosOne = winStates[i][0]
            let winPosTwo = winStates[i][1]
            let winPosThree = winStates[i][2]
            if (`${getBoard(winPosOne)}${getBoard(winPosTwo)}${getBoard(winPosThree)}` == "xxx") {
                gameflow.createWinnerPopup(playerX.getName())
            } else if (`${getBoard(winPosOne)}${getBoard(winPosTwo)}${getBoard(winPosThree)}` == "ooo") {
                gameflow.createWinnerPopup(playerO.getName())
            }
        }

        // Checks to ensure that a tie has not taken place before continuing play.
        for (i = 0; i < board.length; i++) {
            if (board[i] == null) {
                return;
            } else if (i == board.length - 1) {
                gameflow.createWinnerPopup(false); // Tie is found; Display a "tie" popup
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
                square.style.backgroundColor = "#F19C79"
            } else if (gameboard.getBoard(i) == "o") {
                square.textContent = "O"
                square.style.backgroundColor = "#F19C79"
            }

            // Adds listener to square to detect a player clicking on it
            square.addEventListener('click', function() { gameboard.turnTaken(square.getAttribute('data-value')) });
    
            // Adds element to grid
            grid.appendChild(square)
        }
    }
    return {update}
})();

// Start button functions the same as pageload, but enables play.
const startButton = document.querySelector('.start')
startButton.addEventListener('click', setup);

function setup() {
    gameflow.init()
    gameboard.init()
    display.update()
}

// pageLoad function setups up enough to display the gameboard, and important information, without allowing the players to begin.
function pageLoad() {
    gameboard.init()
    display.update()
}

pageLoad()