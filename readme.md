# ❌⭕️ Tic Tac Toe Jam! ❌⭕️

## Introduction
Hello! As part of my General Assembly Software Engineering Immersive, our first assignment is to build a Tic Tac Toe game.

Access the game here: [Chai's tic tac toe](https://chai-ng.github.io/tic-tac-toe-jam/)

## Approach taken

I wanted to re-invent the classic tic-tac-toe game, and add in a few cool new features such as:
* playing against a computer
* position suggestions

### Project approach
1. Setup _Trello project board_ to outline key tasks and requirements, prioritise them and have a home for my fun ideas 
![project-board-setup](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/project-board-setup.png)

2. Get inspired by other tic tac toe games, and minimalist puzzle games out there and put the fun ideas on my backlog
![figma-inspiration-board](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/figma-inspiration.png?raw=true)

3. Wireframe out the flow of the game on _Figma_, including the fun features and carve out what is the 'MVP' equivalent
![figma-wireframes](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/wireframe-flow.png)

4. Build the barebones logic and elements on the game, and style the bare minimum so that it's at least lookable
![first-game-pass](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/first-game-logic.png?raw=true)

5. Don't hold back - start building out those fun features!
![full-game-view](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/full-game-view.png?raw=true)

### Technology used
HTML
CSS
Javascript

## Installation instructions

Navigate to my site to play this: [Chai's tic tac toe](https://chai-ng.github.io/tic-tac-toe-jam/)

## Backlog of features

## Appendix: Project approach phase
### Phase 1: Build the basic logic for a single round, two humans
I defined MVP as meeting the assignment requirements of:
1. Render the game online, in a browser with HTML, CSS and Javascript written in 'KISS'-worthy code
2. Play the core game loop, alternating between humans and being able to declare a winner

**Flow of the game loop and code:**
1. Generate game board dynamically based on `boardSize` (e.g. 3 meant 3 x 3 grid, 5 meant 5 x 5 grid)
2. Determine who would go first and prompt players on who's turn it is
3. Allow players to add their `token` to where they have clicked
   1. IF: Check that space is not empty
      1. TRUE: If not empty, make no change and let users know
      2. FALSE: If empty, then assign the `currentPlayer` token, then
         1. IF: Check if move has satisfied a winning condition
            1. TRUE: If yes, end the game and declare `currentPlayer` winner
            2. FALSE: If no, then...
               1. IF: Check if the board has been filled
                  1. TRUE: Return a draw
                  2. FALSE: Switch to the other user and prompt for input
4. Check winning condition
   1. Retrieve the current `board` into an array
   2. Check against the below three winning conditions, by looping through the array
      1. Complete rows
      2. Complete columns
      3. Diagonal and Reverse Diagnoal
   3. If there is a winning match then
      1. Highlight the `winningSet`
      2. Return true

### Phase 2: Set the mood of the game
I wanted to go for a soothing, minimalist style tic-tac-toe, included with my favorite lo-fi songs. Perfect for a rainy day in.

Style would be 3D minimalist.

The CSS features I wanted to include were:
- Gradient background
- Dynamically generated size of CSS boxes
- Beautiful buttons
- Mobile-friendly design
- Microinteractions when clicking or hovering over parts of the game

### Phase 3: Make it mine
For this part, it was really getting creative about the different features I could build to put my personal twist on tic-tac-toe.

I wanted to encourage people to be incentivised to play the game

**A few of the twists I included:**
1. Customisable game setup with number of rounds, board size and player tokens\

2. Undo and suggestion functions\

3. 'Tetris' tic-tac-toe\
*Inspired by the other classic childhood game, I wanted to combine the time-sensitive nature of tetris with this game, to increase the level of difficulty for the player*
