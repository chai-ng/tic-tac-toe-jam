// 0. Setup key variables
// HTML DOM elements
var gameBoard = document.querySelector('.gameboard');
var gameCells = document.querySelectorAll('.game-cell');
var playerProfiles = document.querySelectorAll('.player-profile');
var playerTypes = document.querySelectorAll('.player-type');
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
var btnUndoMove = document.querySelector('.btn-undo-move');
var btnSuggestMove = document.querySelector('.btn-suggest-move');
var btnNewGame = document.querySelector('.btn-new-game');
var btnPlayAgain = document.querySelector('.btn-play-again');
var btnSelectRight = document.querySelectorAll('.select-right');
var btnSelectLeft = document.querySelectorAll('.select-left');

// Customisation options
var tokens = [1, -1, 'X', 'O', '❌', '⭕️', '🤩', '🥳', '😸', '🐶'];
var types = ['&#x1F64B','&#x1F47E'];

// Game variables
var boardSize = Number(gameOptions[0].innerHTML);
var board = [];
var roundLog = [];
var rounds = Number(gameOptions[1].innerHTML);
var winningPlayers = [];
var winningSet = [];
var currentRound = -1;
var currentPlayer = 0; // Index number of whose turn it currently is
var players = [{
        name: 'Player 1',
        token: gameOptions[2].innerHTML,
        score: 0,
        type: '&#x1F64B'
    },
    {
        name: 'Player 2',
        token: gameOptions[3].innerHTML,
        score: 0,
        type: '&#x1F47E'
    }
]

// 1. Generate game board based on settings (gameboard size, token, number of rounds)
var generateGame = function () {
    rounds = Number(gameOptions[1].innerHTML);
    currentRound = -1;
    winningPlayers = [];
    players[0].token = gameOptions[2].innerHTML;
    players[1].token = gameOptions[3].innerHTML;
    playerTokens.forEach(function (x, i) {
        x.innerHTML = players[i].token;
    })
    playerTypes.forEach(function(x,i) {
        x.innerHTML = players[i].type;
    })
    generateCounter();
}

// Create counter based on number of rounds
var generateCounter = function () {
    for (var round = 0; round < rounds; round++) {
        var circle = document.createElement('div');
        circle.classList = 'single-round';
        counter.appendChild(circle);
    }
    roundCounters = document.querySelectorAll('.single-round');
}

// Create a round (repeated if there are multiple rounds in a game)
var generateRound = function (boardSize) {
    // Reset the page and the game
    gameBoard.innerHTML = "";
    board = [];
    winningSet = [];
    roundLog = [];
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
            gameCell.setAttribute('data-index', row * boardSize + cell);
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

// Select next counter as next round
var highlightCounter = function () {
    if (currentRound == 0) {
        roundCounters[currentRound].classList.add('current-round');
    } else {
        roundCounters[currentRound].classList.add('current-round');
    }
}

// Update the winning round
var updateCounter = function (outcome) {
    if (outcome == 'win') {
        roundCounters[currentRound].innerHTML = players[currentPlayer].token;
    } else if (outcome == 'draw') {
        roundCounters[currentRound].classList.add('draw-round');
    }
    roundCounters[currentRound].classList.remove('current-round');
    roundCounters[currentRound].classList.add('completed-round');
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

    // If the player is a bot player, then run the insertToken for a given coordinate
    if (players[currentPlayer].type == '&#x1F47E') {
        setTimeout(botToken, 2000);
    }
}

// Check if cell is empty
var isEmpty = function (cell) {
    return cell.length === 0;
}

// Check if gameboard is filled
var isFilled = function (currentBoard) {
    for (var row = 0; row < boardSize; row++) {
        for (var col = 0; col < boardSize; col++) {
            if (isEmpty(currentBoard[row][col])) {
                return false;
            }
        }
    }
    return true;
}

// Return an array of empty coordinates of the current board state
var emptyCells = function (currentBoard) {
    var emptyCellArray = [];
    for (var row = 0; row < boardSize; row++) {
        for (var col = 0; col < boardSize; col++) {
            if (isEmpty(currentBoard[row][col])) {
                emptyCellArray.push([row, col]);
            }
        }
    }
    return emptyCellArray;
}

// Evaluate the move, if it results in a win or draw, or next turn
var evaluateMove = function() {
    if (checkWin(checkBoard())) {
        winningPlayers.push(currentPlayer);
        winningSet.forEach(highlightWin);
        message.innerHTML = `${players[currentPlayer].name} wins the round!`;
        btnPlayAgain.style.display = 'block';
        updateCounter('win');
        checkGameWinner();
    } else if (checkDraw(checkBoard())) {
        message.innerHTML = "This round is a draw!";
        btnPlayAgain.style.display = 'block';
        updateCounter('draw');
        checkGameWinner();
    } else {
        currentPlayer = Number(!currentPlayer);
        whoseTurn();
    } 
}

// If there is a 'suggested-cell' then unselect it on the board, regardless if user selected
var unsuggestCell = function() {
    if (document.querySelector('.suggested-cell') != null) {
        document.querySelector('.suggested-cell').classList.remove('suggested-cell');
    }
}

// 3. Insert a token where the user has clicked
var insertToken = function (event) {
    // Check if empty before allowing to insert element
    if (isEmpty(event.target.innerHTML)) {
        // Insert token and store in the gamelog, refresh message
        event.target.innerHTML = players[currentPlayer].token;
        roundLog.push(event.target.getAttribute('data-index'));
        message.innerHTML = '';

        // De-select the suggested cell
        unsuggestCell();

        // Check for win conditions
        evaluateMove();
    } else {
        message.innerHTML = 'Space is already filled, try again';
    }
}

// Bot action to insertToken based on next best move coordinates converted into an index
var botToken = function() {
    // Find the index of the next best move
    var coordinates = nextBestMove(checkBoard(), emptyCells(checkBoard()).length, currentPlayer, currentPlayer);
    coordinates.pop();
    var index = coordinatesToIndex(coordinates);

    // Insert the bot's token in there and store in roundLog
    gameCells[index].innerHTML = players[currentPlayer].token;
    roundLog.push(gameCells[index].getAttribute('data-index'));
    
    // De-select suggested cell
    message.innerHTML = '';
    unsuggestCell();

    // Check if it is a win, draw or next move
    evaluateMove();
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
    return board;
}

// Check rows for winning condition
var checkRows = function (currentBoard, storeResults = true) {
    var result = false;
    for (var row = 0; row < boardSize; row++) {
        for (var col = 0; col < boardSize; col++) {
            if (isEmpty(currentBoard[row][col])) {
                result = false;
                break;
            }
            if (currentBoard[row][col] != currentBoard[row][0]) {
                result = false;
                break;
            }
            result = true;
        }
        if (result) {
            if (storeResults) {
                for (var col = 0; col < boardSize; col++) {
                    var winningCell = [row, col];
                    winningSet.push(winningCell);
                }
            }
            return result;
        }
    }
    return result;
}

// Check columns for winning conditions
var checkCols = function (currentBoard, storeResults = true) {
    var result = false;
    for (var col = 0; col < boardSize; col++) {
        for (var row = 0; row < boardSize; row++) {
            if (isEmpty(currentBoard[row][col])) {
                result = false;
                break;
            }
            if (currentBoard[row][col] != currentBoard[0][col]) {
                result = false;
                break;
            }
            result = true;
        }
        if (result) {
            if (storeResults) {
                for (var row = 0; row < boardSize; row++) {
                    var winningCell = [row, col];
                    winningSet.push(winningCell);
                }
            }
            return result;
        }
    }
    return result;
}

// Check diagonals for winning conditions
var checkDiagonals = function (currentBoard, storeResults = true) {
    var result = false;

    // A. Check for normal diagonal top left to bottom right
    for (var diag = 0; diag < boardSize; diag++) {
        if (isEmpty(currentBoard[diag][diag])) {
            result = false;
            break;
        }
        if (currentBoard[diag][diag] != currentBoard[0][0]) {
            result = false;
            break;
        }
        result = true;
    }

    if (result && storeResults) {
        // append the winning row and their cols into the winningSet array
        for (var diag = 0; diag < boardSize; diag++) {
            var winningCell = [diag, diag];
            winningSet.push(winningCell);
        }
        return result;
    }
    return result;
}

var checkReverseDiagonal = function (currentBoard, storeResults = true) {
    // B. Check for reverse diagonal bottom left to top right;
    for (var col = 0; col < boardSize; col++) {
        var row = boardSize - 1 - col;
        if (isEmpty(currentBoard[row][col])) {
            result = false;
            break;
        }
        if (currentBoard[row][col] != currentBoard[boardSize - 1][0]) {
            result = false;
            break;
        }
        result = true;
    }
    if (result && storeResults) {
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

// Master win condition function to check if any of the win conditions are fulfilled
var checkWin = function (currentBoard, storeResults = true) {
    if (checkRows(currentBoard, storeResults) || checkCols(currentBoard, storeResults) || checkDiagonals(currentBoard, storeResults) || checkReverseDiagonal(currentBoard,storeResults)) {
        return true;
    } else {
        return false;
    }
}

var checkDraw = function (currentBoard) {
    return (isFilled(checkBoard()))
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
        btnPlayAgain.innerHTML = 'Next round';
    } else {
        if (winningPlayers.filter(function (number) {
                return number == 0;
            }).length > winningPlayers.length / 2) {
            message.innerHTML += " Player 1 wins the game!"
        } else if (winningPlayers.filter(function (number) {
                return number == 1;
            }).length > winningPlayers.length / 2) {
            message.innerHTML += " Player 2 wins the game!"
        } else {
            message.innerHTML += " It's a draw!"
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
    if (tokenIndex < tokens.length - 1) {
        event.target.previousElementSibling.innerHTML = tokens[tokenIndex + 1];
    }
}

var downToken = function (event) {
    var tokenIndex = tokens.indexOf(event.target.nextElementSibling.innerHTML);
    if (tokenIndex > 0) {
        event.target.nextElementSibling.innerHTML = tokens[tokenIndex - 1];
    }
}

// Min max Tic Tac Toe bot:
var nextBestMove = function (currentBoard, depth, player, playerSolving) {
    // Initialise the return array, with players starting from their worse score, so that the 'best outcome' can be overridden by even a draw score
    // debugger;
    if (player === playerSolving) {
        var best = [-1, -1, -99]; // Arbitrarily high number that can be overridden by a 'draw' = 0
    } else {
        var best = [-1, -1, 99];
    }

    // If there is a winning condition, evaluate if that is a good or bad thing for the currentPlayer
    if (checkWin(currentBoard, false) && player !== playerSolving) {
        // previous winning move was made by the playerSolving, therefore creates a positive score to solve for
        var score = boardSize + depth;
        return [-1, -1, score];
    } else if (checkWin(currentBoard, false)) {
        var score = -boardSize - depth;
        return [-1, -1, score];
    } else if (depth == 0) { // check for a draw
        var score = 0;
        return [-1, -1, score];
    }

    // If there isn't a 'win' or a 'draw' keep looping through the empty cells
    var possibleMoves = emptyCells(currentBoard);
    for (var index = 0; index < possibleMoves.length; index++) {
        cell = possibleMoves[index];
        var x = cell[0]
        var y = cell[1];
        currentBoard[x][y] = players[player].token;
        var outcome = nextBestMove(currentBoard, depth - 1, Number(!player), playerSolving); // How to include current Player in this...
        currentBoard[x][y] = ''; // undo the move
        outcome[0] = x;
        outcome[1] = y;

        // If the player in this scenario is the same as the active player, then pick the outcome with the highest score, otherwise, pick 
        if (player === playerSolving) {
            // Maximise, where you want to pick the highest possible score
            if (outcome[2] > best[2]) {
                best = outcome;
            }
        } else {
            // Minimise, because negative scores are how they win
            if (outcome[2] < best[2]) {
                best = outcome;
            }
        }
    }

    return best;
}

var indexToCoordinates = function (index) {
    var coordinates = [];
    coordinates.push(Math.floor(index / boardSize));
    coordinates.push(index % boardSize);
    return coordinates;
}

var coordinatesToIndex = function (coordinates) {
    var index = -1;
    index = coordinates[0] * 3 + coordinates[1];
    return index;
}

var undoMove = function () {
    var prevMove = roundLog.pop();
    gameCells[prevMove].innerHTML = "";
    currentPlayer = Number(!currentPlayer);
    whoseTurn();
}

var selectRandomCell = function () {
    var emptyCellArray = emptyCells(checkBoard());
    var randomCoordinates = emptyCellArray[Math.round(Math.random() * emptyCellArray.length)]
    gameCells[coordinatesToIndex(randomCoordinates)].classList.add('suggested-cell');
}

// When initialising the game, check if the player is a human or bot
// If player is a bot, then whenever it is their turn using the whoseTurn(); 
// Let their 'insertToken' be the coordinates from the nextBestMove function (delay for 1 or 2 seconds)

btnSuggestMove.addEventListener('click', function () {
    var coordinates = nextBestMove(checkBoard(), emptyCells(checkBoard()).length, currentPlayer, currentPlayer);
    console.log(coordinates);
    coordinates.pop();
    var index = coordinatesToIndex(coordinates);
    if (index >= 0) {
        gameCells[index].classList.add('suggested-cell');
    } else {
        selectRandomCell();
    }
})

btnUndoMove.addEventListener('click', undoMove);

btnSelectRight[0].addEventListener('click', plusOne);
btnSelectRight[1].addEventListener('click', plusOne);
btnSelectLeft[0].addEventListener('click', minusOne);
btnSelectLeft[1].addEventListener('click', minusOne);

btnSelectRight[2].addEventListener('click', upToken);
btnSelectRight[3].addEventListener('click', upToken);
btnSelectLeft[2].addEventListener('click', downToken);
btnSelectLeft[3].addEventListener('click', downToken);

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