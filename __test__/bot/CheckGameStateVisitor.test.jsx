import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import BoardVisitor from '../../app/visitor/BoardVisitor.jsx';
import CheckGameStateVisitor from '../../app/visitor/CheckGameStateVisitor.jsx';

test('check game gameState board 1', () => {
  let board = convertTxtToBoard('board1');

  let evaluator = new CheckGameStateVisitor();
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.gameFinished).toBe(false);
});

test('check game gameState board 4', () => {
  let board = convertTxtToBoard('board4');

  let evaluator = new CheckGameStateVisitor();
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.gameFinished).toBe(true);
  expect(evaluator.winner).toBe('X');
});

test('check game gameState board 5', () => {
  let board = convertTxtToBoard('board5');

  let evaluator = new CheckGameStateVisitor();
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.gameFinished).toBe(false);

  board.set(5, 2, 'X');
  BoardVisitor.accept(board, evaluator);
  expect(evaluator.gameFinished).toBe(true);
  expect(evaluator.winner).toBe('X');

});