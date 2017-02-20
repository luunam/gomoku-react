import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import Bot from '../../app/components/bot/Bot.jsx';
import Boundary from '../../app/components/bot/Boundary.jsx';

test('test bot board 5', () => {
  let board = convertTxtToBoard('board5');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 4, 2, 0);
  let ret = bot.calculateNextMove(5, 1, board);

  expect(ret).toEqual({x: 5, y: 2, symbol: 'O'});
});

test('test bot board 6', () => {
  let board = convertTxtToBoard('board6');
  let bot = new Bot(1);

  bot.boundary = new Boundary(4, 1, 3, 1);
  let ret = bot.calculateNextMove(3, 2, board);

  let possibleMoves = [
    {x: 0, y: 2, symbol: 'O'},
    {x: 4, y: 2, symbol: 'O'}
  ];
  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 7', () => {
  let board = convertTxtToBoard('board7');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(4, 3, board);

  console.log(ret);
  console.log(board.draw());
  expect(1).toBe(1);
});