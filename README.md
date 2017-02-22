# gomoku-react

This is a gomoku game built with react and webpack. Play it here: https://luunam.github.io/gomoku-react/

## Rule
The game objective is to get 5 in a row horizontally, diagonally or vertically before your opponent.

## Build
Clone the directory and run `npm install`

To build use `npm run build`

To run tests run `npm test`

## Development
This AI bot uses minimax algorithm with alpha-beta pruning.

You can write your own bot too, just name the file Bot.jsx and put it under bot folder.
The only method that bot has to have is `calculateNextMove(x, y, board)`, where `x` and `y` are coordinates of opponent's last move.
You can manipulate `board` using `board.set(x, y, symbol)`, `board.get(x, y)`, and `board.size`
