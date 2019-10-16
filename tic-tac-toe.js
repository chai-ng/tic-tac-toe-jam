// 0. Setup key variables
var boardSize = 3;
var rounds = 1;
var currentPlayer = 0; // Index number of whose turn it currently is
var players = [{
        name: 'Player 1',
        token: 'X',
        score: 0
    },
    {
        name: 'Player 2',
        token: 'O',
        score: 0
    }
]
var board = [];
var winningSet = [];

var gameBoard = document.querySelector('.gameboard');
var gameCells = document.querySelectorAll('.game-cell');
var playerProfiles = document.querySelectorAll('.player-profile');
var btnExitGame = document.querySelector('.btn-exit-game');
var btnNewGame = document.querySelector('.btn-new-game');

// 1. Generate game board based on settings (gameboard size, token, number of rounds)
var generateRound = function (boardSize) {
    // Reset the page and the game
    gameBoard.innerHTML = "";
    board = [];
    winningSet = [];

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
    whoseTurn();
}

// Keep track of who's turn is it and highlight the user
var whoseTurn = function () {
    playerProfiles[currentPlayer].classList.add('current-player');
    playerProfiles[Number(!currentPlayer)].classList.remove('current-player');
}

// Check if cell is empty
var isEmpty = function (cell) {
    return cell.length === 0;
}

// Check if gameboard is filled
var isFilled = function () {
    var result = true;
    gameCells.forEach(function (x) {
        if (isEmpty(x.innerHTML)) {
            result = false;
        }
    })
    return result
}

// 3. Insert a token where the user has clicked
var insertToken = function (event) {
    // Check if empty before allowing to insert element
    if (isEmpty(event.target.innerHTML)) {
        event.target.innerHTML = players[currentPlayer].token;

        // Check for win conditions
        if (checkWin()) {
            // TODO: end the game with pop-up box
        } else {

            // Check if board is filled for a draw condition
            if (isFilled()) {
                console.log("It's a draw!");
            } else {
                currentPlayer = Number(!currentPlayer);
                whoseTurn();
                console.log(`It is ${players[currentPlayer].name}'s turn now`);
            }
        }
    } else {
        console.log('Space is already filled, try again');
    }
}

// 4. Check for current gameboard for a winning conditions and higlight the winning row
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

// Check rows for winning condition
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
            // append the winning row and their cols into the winningSet array
            for (var col = 0; col < boardSize; col++) {
                var winningCell = [row, col];
                winningSet.push(winningCell);
            }
            return result;
        }
    }
    return result;
}

// Check columns for winning conditions
var checkCols = function () {
    var result = false;
    for (var col = 0; col < boardSize; col++) {
        for (var row = 0; row < boardSize; row++) {
            if (isEmpty(board[row][col])) {
                result = false;
                break;
            }
            if (board[row][col] != board[0][col]) {
                result = false;
                break;
            }
            result = true;
        }
        if (result) {
            // append the winning row and their cols into the winningSet array
            for (var row = 0; row < boardSize; row++) {
                var winningCell = [row, col];
                winningSet.push(winningCell);
            }
            return result;
        }
    }
    return result;
}

// Check diagonals for winning conditions
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
        // append the winning row and their cols into the winningSet array
        for (var diag = 0; diag < boardSize; diag++) {
            var winningCell = [diag, diag];
            winningSet.push(winningCell);
        }
        return result;
    }

    // B. Check for reverse diagonal bottom left to top right;
    for (var col = 0; col < boardSize; col++) {
        var row = boardSize - 1 - col;
        if (isEmpty(board[row][col])) {
            result = false;
            break;
        }
        if (board[row][col] != board[boardSize - 1][0]) {
            result = false;
            break;
        }
        result = true;
    }
    if (result) {
        // append the winning row and their cols into the winningSet array
        for (var col = 0; col < boardSize; col++) {
            var row = boardSize - 1 - col;
            var winningCell = [row, col];
            winningSet.push(winningCell);
        }
        return result;
    }

    return result;
}

// Highlight the winning set of cells
var highlightWin = function (coordinates) {
    var row = coordinates[0];
    var col = coordinates[1];
    var index = row * boardSize + col;
    gameCells[index].classList.add('winning-cell');
}

// Master function
var checkWin = function () {
    checkBoard();
    if (checkRows() || checkCols() || checkDiagonals()) {
        console.log(`${players[currentPlayer].name} is the winner!`)
        winningSet.forEach(highlightWin);
        return true;
    }
}

// Initiate the game
// Name the players

// Create counter of number of rounds
// For each round, record either win / lose / draw and show mini screenshot of the round, offer to download?
// Once wins > Math.floor(rounds / 2) -> declare game winner
// If all draws -> declare draw

// Initialise base game
generateRound(boardSize);
determineOrder();

// 7. Prompt for new game
btnNewGame.addEventListener('click', function () {
    generateRound(boardSize);
    determineOrder();
});

btnExitGame.addEventListener('click', function () {
    gameBoard.innerHTML = "";
})