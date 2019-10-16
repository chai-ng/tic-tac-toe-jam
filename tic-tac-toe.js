// 0. Setup key variables
var boardSize = 3;
var rounds = 1;
var currentPlayer = 0; // Index number of whose turn it currently is
var players = [{
        name: 'Player 1',
        token: '1',
        score: 0
    },
    {
        name: 'Player 2',
        token: '2',
        score: 0
    }
]
var board = [];

var gameBoard = document.querySelector('.gameboard');
var gameCells = document.querySelectorAll('.game-cell');
var btnExitGame = document.querySelector('.btn-exit-game');
var btnNewGame = document.querySelector('.btn-new-game');

// 1. Generate game board based on settings (gameboard size, token, number of rounds)
var generateGame = function (boardSize) {
    // Reset the page
    gameBoard.innerHTML = "";

    // Create each row and append to gameboard
    for (var row = 0; row < boardSize; row++) {
        var gameRow = document.createElement('div');
        gameRow.classList = 'game-row';

        // Create each box and append to gameRow
        for (var cell = 0; cell < boardSize; cell++) {
            var gameCell = document.createElement('div');
            gameCell.classList = 'game-cell';
            gameRow.appendChild(gameCell);
        }
        gameBoard.appendChild(gameRow);
    }

    // Update boardSize and gameCells
    gameCells = document.querySelectorAll('.game-cell');
    gameCells.forEach(function (x) {
        x.addEventListener('click', insertToken);
    })
}

// 2. Determine who goes first and their respective tokens
var determineOrder = function () {
    currentPlayer = Math.round(Math.random());
    console.log(`${players[currentPlayer].name} goes first!`);
}

// 3. Keep track of who's turn is it, highlight the user, and prompt if no input is received
var gameTurn = function () {

}

// Check if cell is empty
var isEmpty = function (cell) {
    return cell.length === 0;
}

// 4. Insert a token where the user has clicked
var insertToken = function (event) {
    // Check if empty before allowing to insert element
    if (isEmpty(event.target.innerHTML)) {
        event.target.innerHTML = players[currentPlayer].token;
        // check for win conditions
        if (checkWin()) {
            // end the game with pop-up box
        } else {
            currentPlayer = Number(!currentPlayer);
            console.log(`It is ${players[currentPlayer].name}'s turn now`);
        }
    } else {
        console.log('Space is already filled, try again');
    }
}

// 5. Retrieve the current gameboard in an array
var checkBoard = function () {
    // reset board
    board = [];
    // loop through each row and retrieve the value for each cell
    for (var row = 0; row < boardSize; row++) {
        var boardRow = [];
        for (var cell = 0; cell < boardSize; cell++) {
            index = (row * boardSize) + cell;
            boardRow.push(gameCells[index].innerHTML);
        }
        board.push(boardRow);
    }
}

// 6. Check for winning conditions
var checkRows = function () {
    var result = false;
    for (var row = 0; row < boardSize; row++) {
        for (var col = 0; col < boardSize; col++) {
            if (isEmpty(board[row][col])) {
                result = false;
                break;
            }
            if (board[row][col] != board[row][0]) {
                result = false;
                break;
            }
            result = true;
        }
        if (result) {
            return result;
        }
    }
    return result;
}

var checkCols = function () {
    var result = false;
    for (var col = 0; col < boardSize; col++) {
        for (var row = 0; row < boardSize; row++) {
            if (isEmpty(board[row][col])) {
                result = false;
                break;
            }
            if (board[row][col] != board[row][0]) {
                result = false;
                break;
            }
            result = true;
        }
        if (result) {
            return result;
        }
    }
    return result;
}

var checkDiagonals = function () {
    var result = false;

    // A. Check for normal diagonal top left to bottom right
    for (var diag = 0; diag < boardSize; diag++) {
        if (isEmpty(board[diag][diag])) {
            result = false;
            break;
        }
        if (board[diag][diag] != board[0][0]) {
            result = false;
            break;
        }
        result = true;
    }

    if (result) {
        return result;
    }

    // B. Check for reverse diagonal bottom left to top right;
    for (var col = 0; col < boardSize; col++) {
        var row = boardSize - 1 - col;
        if (isEmpty(board[row][col])) {
            result = false;
            break;
        }
        if (board[row][col] != board[boardSize-1][0]) {
            result = false;
            break;
        }
        result = true;
    }
    return result;
}

var checkWin = function () {
    checkBoard();
    if (checkRows() || checkCols() || checkDiagonals()) {
        console.log(`${players[currentPlayer].name} is the winner!`)
        return true;
    }
}

// 7. Prompt for new game
generateGame(boardSize);
determineOrder();
btnNewGame.addEventListener('click', function () {
    generateGame(boardSize);
});

btnExitGame.addEventListener('click', function () {
    gameBoard.innerHTML = "";
})

