// 0. Setup key variables
// HTML DOM elements
var gameBoard = document.querySelector('.gameboard');
var gameCells = document.querySelectorAll('.game-cell');
var playerProfiles = document.querySelectorAll('.player-profile');
var playerTokens = document.querySelectorAll('.player-token');
var modal = document.querySelector('.modal');
var modalHeader = document.querySelector('.modal-header');
var modalParagraph = document.querySelector('.modal-paragraph');
var gameOptions = document.querySelectorAll('.selection');
var counter = document.querySelector('.counter');
var roundCounters = document.querySelectorAll('.single-round');
var message = document.querySelector('.message');

// HTML Buttons
var btnExitGame = document.querySelector('.btn-exit-game');
var btnNewGame = document.querySelector('.btn-new-game');
var btnPlayAgain = document.querySelector('.btn-play-again');
var btnSelectRight = document.querySelectorAll('.select-right');
var btnSelectLeft = document.querySelectorAll('.select-left');

// Customisation options
var tokens = ['X', 'O', '❌', '⭕️', '🤩', '🥳'];

// Game variables
var boardSize = Number(gameOptions[0].innerHTML);
var board = [];
var rounds = Number(gameOptions[1].innerHTML);
var winningPlayers = [];
var winningSet = [];
var currentRound = -1;
var currentPlayer = 0; // Index number of whose turn it currently is
var players = [{
        name: 'Player 1',
        token: gameOptions[2].innerHTML,
        score: 0
    },
    {
        name: 'Player 2',
        token: gameOptions[3].innerHTML,
        score: 0
    }
]

// 1. Generate game board based on settings (gameboard size, token, number of rounds)
var generateGame = function() {
    rounds = Number(gameOptions[1].innerHTML);
    currentRound = -1;
    roundWinners = [];
    players[0].token = gameOptions[2].innerHTML;
    players[1].token = gameOptions[3].innerHTML;
    playerTokens.forEach(function(x, i) {
        x.innerHTML = players[i].token;
    })
    generateCounter();
}

var generateRound = function (boardSize) {
    // Reset the page and the game
    gameBoard.innerHTML = "";
    board = [];
    winningSet = [];
    boardSize = Number(gameOptions[0].innerHTML);
    rounds -= 1;
    currentRound += 1;

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

    determineOrder();
    highlightCounter();
}

// Create counter based on number of rounds
var generateCounter = function() {
    for (var round = 0; round < rounds; round++) {
        var circle = document.createElement('div');
        circle.classList = 'single-round';
        counter.appendChild(circle);
    }
    roundCounters = document.querySelectorAll('.single-round');
}

// Update the winning round
var updateCounter = function(outcome) {
    if (outcome == 'win') {
        roundCounters[currentRound].innerHTML = players[currentPlayer].token;
    } else {
        roundCounters[currentRound].classList.add('draw-round');
    }
    roundCounters[currentRound].classList.remove('current-round');
    roundCounters[currentRound].classList.add('completed-round');
}

// Select next counter as next round
var highlightCounter = function() {
    if (currentRound == 0) {
        roundCounters[currentRound].classList.add('current-round');
    } else {
        roundCounters[currentRound].classList.add('current-round');
    }
}

// 2. Determine who goes first and their respective tokens
var determineOrder = function () {
    currentPlayer = Math.round(Math.random());
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
        message.innerHTML = '';

        // Check for win conditions
        if (checkWin()) {
            checkGameWinner();
        } else {
            currentPlayer = Number(!currentPlayer);
            whoseTurn();
        }
    } else {
        message.innerHTML = 'Space is already filled, try again';
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
        winningSet.forEach(highlightWin);
        message.innerHTML = `${players[currentPlayer].name} wins the round!`;
        btnPlayAgain.style.display = 'block';
        updateCounter('win');
        return true;
    } else if (isFilled()) {
        message.innerHTML = "This round is a draw!";
        btnPlayAgain.style.display = 'block';
        updateCounter('draw');
        return true;
    } else {
        return false;
    }
}

// Declare winner by opening up a modal
var openModal = function () {
    modal.style.display = "block";
}

var closeModal = function () {
    modal.style.display = "none";
}

var checkGameWinner = function () {
    if (rounds > 0) {
        winningPlayers.push(currentPlayer);
        btnPlayAgain.innerHTML = 'Next round';
    } else {
        winningPlayers.push(currentPlayer);
        if (winningPlayers.filter(function(number) {
            return number == 0;
        }).length > winningPlayers.length/2) {
            message.innerHTML += " Player 1 wins the game!"
        } else {
            message.innerHTML += " Player 2 wins the game!"
        }
        btnPlayAgain.innerHTML = 'Play again';
    }
}

// Allow players to change the number of rounds and board size
var plusOne = function (event) {
    event.target.previousElementSibling.innerHTML = Number(event.target.previousElementSibling.innerHTML) + 1;
}

var minusOne = function (event) {
    event.target.nextElementSibling.innerHTML = Number(event.target.nextElementSibling.innerHTML) - 1;
}

// Allow players to change their token
var upToken = function (event) {
    var tokenIndex = tokens.indexOf(event.target.previousElementSibling.innerHTML);
    if (tokenIndex < tokens.length-1) {
        event.target.previousElementSibling.innerHTML = tokens[tokenIndex+1];
    }
}

var downToken = function (event) {
    var tokenIndex = tokens.indexOf(event.target.nextElementSibling.innerHTML);
    if (tokenIndex > 0) {
        event.target.nextElementSibling.innerHTML = tokens[tokenIndex-1];
    }
}

btnSelectRight[0].addEventListener('click', plusOne);
btnSelectRight[1].addEventListener('click', plusOne);
btnSelectLeft[0].addEventListener('click', minusOne);
btnSelectLeft[1].addEventListener('click', minusOne);

btnSelectRight[2].addEventListener('click', upToken);
btnSelectRight[3].addEventListener('click', upToken);
btnSelectLeft[2].addEventListener('click', downToken);
btnSelectLeft[3].addEventListener('click', downToken);

// btnSelectRight.forEach(function (x) {
//     x.addEventListener('click', plusOne);
// })

// btnSelectLeft.forEach(function (x) {
//     x.addEventListener('click', minusOne);
// })

btnNewGame.addEventListener('click', function () {
    generateGame();
    generateRound(boardSize);
    closeModal();
});

btnExitGame.addEventListener('click', function () {
    openModal();
})

btnPlayAgain.addEventListener('click', function () {
    if (rounds > 0) {
        generateRound(boardSize);

    } else {
        counter.innerHTML = ""
        openModal();
    }
    message.innerHTML = "";
    btnPlayAgain.style.display = 'none';
})