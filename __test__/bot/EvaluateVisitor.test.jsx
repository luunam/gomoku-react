import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import BoardVisitor from '../../app/visitor/BoardVisitor.jsx';
import EvaluateVisitor from '../../app/visitor/EvaluateVisitor.jsx';

test('test evaluate visitor board 1', () => {
  let board1 = convertTxtToBoard('board1');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board1, evaluator);

  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentFour).toBe(1);
});

test('test evaluate visitor board 2', () => {
  let board = convertTxtToBoard('board2');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.opponentFour).toBe(2);
  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentOpenThree).toBe(0);
  expect(evaluator.ourFour).toBe(0);
  expect(evaluator.ourOpenFour).toBe(1);
});

test('test evaluate visitor board 3', () => {
  let board = convertTxtToBoard('board3');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.opponentFour).toBe(2);
  expect(evaluator.opponentOpenFour).toBe(1);
  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentOpenThree).toBe(4);
  expect(evaluator.ourFour).toBe(0);
  expect(evaluator.ourOpenFour).toBe(1);
  // expect(evaluator.opponentSeparateThree).toBe(1);
});

test('test evaluate visitor board 5', () => {
  let board = convertTxtToBoard('board5');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.opponentFour).toBe(0);
  expect(evaluator.ourOpenThree).toBe(0);
  expect(evaluator.opponentOpenThree).toBe(0);
  expect(evaluator.ourFour).toBe(1);
});

test('test evaluate visitor board 7', () => {
  let board = convertTxtToBoard('board7');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.opponentOpenTwo).toBe(2);
});

test('test evaluate visitor board 8', () => {
  let board = convertTxtToBoard('board8');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.opponentFour).toBe(0);
  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentOpenThree).toBe(0);
  expect(evaluator.ourFour).toBe(1);
});

test('test evaluate visitor board 10', () => {
  let board = convertTxtToBoard('board10');

  let evaluator = new EvaluateVisitor('X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.ourThree).toBe(1);
  expect(evaluator.opponentOpenFour).toBe(1);
});


test('test evaluate visitor board 16', () => {
  let board = convertTxtToBoard('board16');

  let evaluator = new EvaluateVisitor('X');
  board.set(1, 6, 'X');
  board.set(2, 1, 'O');
  board.set(3, 4, 'X');
  BoardVisitor.accept(board, evaluator);

  expect(evaluator.ourSeparateThree).toBe(1);
  expect(evaluator.ourOpenThree).toBe(1);
});