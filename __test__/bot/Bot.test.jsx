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

  bot.boundary = new Boundary(6, 4, 2, 0);
  let ret = bot.calculateNextMove(3, 0, board);

  expect(ret).toEqual({x: 4, y: 0, symbol: 'O'});
});