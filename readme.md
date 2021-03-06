# Tic Tac Toe Jam!

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

5. Don't hold back - start building out those fun features!\
![full-game-view](https://github.com/chai-ng/tic-tac-toe-jam/blob/master/images/full-game-view.png?raw=true)

### Technology used
HTML: The usual semantics
CSS: Animations and responsive sizing using viewport heights and widths;
Javascript: Javascript arrays, objects and recursive algorithms

## Installation instructions
Navigate to my site to play this: [Chai's tic tac toe](https://chai-ng.github.io/tic-tac-toe-jam/)

## Backlog of features
- 'Falling' tic tac toe
- Including some sick Minecraft background music to set the mood
- 'Dark mode' and customisable backgrounds

## Challenges and lessons learnt
1. Challenges with adding functionality, balancing being MVP / Agile vs. spending more time planning to create flexible functions
2. Leveraging existing people's thinking, and adapting your code to it forces you deep into the logic land
3. Project planning and prioritisaiton really helped me to keep focus, while knowing I have a place to jot down, organise and prioritise my ideas (challenge: My ideas were still scattered over oneNote, notebooks, trello, readme and figma)
4. Debugging and knowing your test cases well are skills for life

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
- Mobile-friendly design
- Microinteractions when clicking or hovering over parts of the game

### Phase 3: Make it mine
For this part, it was really getting creative about the different features I could build to put my personal twist on tic-tac-toe.

**A few of the twists I included:**
1. Customisable game setup with number of rounds, board size, player tokens and whether the players are humans or bots

2. Undo and suggestion functions as 'cheats' for the player (aka my debugging)

3. 'Tetris' bot using the minmax algorithm
No credit taken here and below were the two most helpful articles in building this.
- [Tic-Tac-Toe MiniMax by Cledersonbc](https://github.com/Cledersonbc/tic-tac-toe-minimax/blob/master/README.md)
- [Tic-Tac-Toe with Javascript](https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa)
