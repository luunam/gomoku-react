import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import Bot from '../../app/bot/Bot.jsx';
import Boundary from '../../app/bot/Boundary.jsx';

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

  let possibleMoves = [
    {x: 1, y: 3, symbol: 'O'},
    {x: 5, y: 3, symbol: 'O'}
  ];

  expect(possibleMoves).toContainEqual(ret);
});


test('test bot board 9', () => {

  let board = convertTxtToBoard('board9');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(4, 2, board);

  let possibleMoves = [
    {x: 0, y: 0, symbol: 'O'},
    {x: 0, y: 5, symbol: 'O'}
  ];

  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 9_2', () => {

  let board = convertTxtToBoard('board9');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(4, 3, board);

  let possibleMoves = [
    {x: 0, y: 0, symbol: 'O'},
    {x: 0, y: 5, symbol: 'O'}
  ];

  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 10', () => {

  let board = convertTxtToBoard('board10');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(4, 3, board);

  let possibleMoves = [
    {x: 1, y: 0, symbol: 'O'},
    {x: 1, y: 5, symbol: 'O'}
  ];

  expect(possibleMoves).toContainEqual(ret);
});


test('test bot board 11', () => {

  let board = convertTxtToBoard('board11');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(3, 3, board);

  let possibleMoves = [
    {x: 1, y: 0, symbol: 'O'},
    {x: 1, y: 5, symbol: 'O'}
  ];
  // expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 12', () => {

  let board = convertTxtToBoard('board12');
  let bot = new Bot(1);

  bot.boundary = new Boundary(6, 0, 6, 0);
  let ret = bot.calculateNextMove(5, 3, board);

  let possibleMoves = [
    {x: 1, y: 3, symbol: 'O'},
    {x: 6, y: 3, symbol: 'O'}
  ];
  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 13', () => {

  let board = convertTxtToBoard('board13');
  let bot = new Bot(1);

  bot.boundary = new Boundary(4, 0, 4, 1);
  let ret = bot.calculateNextMove(2, 2, board);

  let possibleMoves = [
    {x: 1, y: 1, symbol: 'O'},
    {x: 4, y: 4, symbol: 'O'},
    {x: 5, y: 5, symbol: 'O'},
    {x: 6, y: 4, symbol: 'O'},
  ];
  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 14', () => {

  let board = convertTxtToBoard('board14');
  let bot = new Bot(1);

  bot.boundary = new Boundary(4, 2, 3, 1);
  let ret = bot.calculateNextMove(2, 1, board);

  let possibleMoves = [
    {x: 1, y: 1, symbol: 'O'},
    {x: 5, y: 1, symbol: 'O'}
  ];
  expect(possibleMoves).toContainEqual(ret);
});

test('test bot board 15', () => {

  let board = convertTxtToBoard('board15');
  let bot = new Bot(1);


  bot.boundary = new Boundary(5, 2, 7, 2);
  let ret = bot.calculateNextMove(4, 7, board);

  expect(ret).toEqual({x: 4, y: 8, symbol: 'O'});
});

test('test bot board 16', () => {

  let board = convertTxtToBoard('board16');

  let bot = new Bot(1);


  bot.boundary = new Boundary(7, 0, 7, 0);
  let ret = bot.calculateNextMove(1, 6, board);
});