import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import BoardVisitor from '../../app/components/bot/BoardVisitor.jsx';
import EvaluateVisitor from '../../app/components/bot/EvaluateVisitor.jsx';

test('test evaluate visitor board 1', () => {
  let board1 = convertTxtToBoard('board1');

  let evaluator = new EvaluateVisitor('X');
  let visitor = new BoardVisitor();
  visitor.visitBoard(board1, evaluator);

  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentFour).toBe(1);
});

test('test evaluate visitor board 2', () => {
  let board = convertTxtToBoard('board2');

  let evaluator = new EvaluateVisitor('X');
  let visitor = new BoardVisitor();
  visitor.visitBoard(board, evaluator);

  expect(evaluator.opponentFour).toBe(2);
  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentOpenThree).toBe(0);
  expect(evaluator.ourFour).toBe(1);
});

test('test evaluate visitor board 3', () => {
  let board = convertTxtToBoard('board3');

  let evaluator = new EvaluateVisitor('X');
  let visitor = new BoardVisitor();
  visitor.visitBoard(board, evaluator);

  expect(evaluator.opponentFour).toBe(3);
  expect(evaluator.ourOpenThree).toBe(1);
  expect(evaluator.opponentOpenThree).toBe(4);
  expect(evaluator.ourFour).toBe(1);
});

test('test evaluate visitor board 5', () => {
  let board = convertTxtToBoard('board5');

  let evaluator = new EvaluateVisitor('X');
  let visitor = new BoardVisitor();
  visitor.visitBoard(board, evaluator);

  expect(evaluator.opponentFour).toBe(0);
  expect(evaluator.ourOpenThree).toBe(0);
  expect(evaluator.opponentOpenThree).toBe(0);
  expect(evaluator.ourFour).toBe(1);
});