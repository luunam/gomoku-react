import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';
import BoardVisitor from '../../app/visitor/BoardVisitor.jsx';
import AdvanceVisitor from '../../app/bot/AdvanceVisitor.jsx';
import PatternManager from '../../app/bot/PatternManager.jsx';

test('test advance visitor bot 1', () => {
  let board = convertTxtToBoard('board1');
  let patternManager = new PatternManager('X');
  let evaluator = new AdvanceVisitor(patternManager);

  BoardVisitor.accept(board, evaluator);
  evaluator.finish();
  console.log(evaluator);
  expect(evaluator['three'][0]).toBe(1);
  expect(evaluator['three'][1]).toBe(1);
  expect(evaluator['openThree'][0]).toBe(1);
  expect(evaluator['openThree'][1]).toBe(0);
  expect(evaluator['four'][1]).toBe(1);
});
//
// test('test advance visitor bot 2', () => {
//   let board = convertTxtToBoard('board2');
//   let patternManager = new PatternManager('X');
//   let evaluator = new AdvanceVisitor(patternManager);
//
//   BoardVisitor.accept(board, evaluator);
//   evaluator.finish();
//
//   expect(evaluator['openTwo']).toEqual([4, 0]);
//
//   expect(evaluator['three']).toEqual([0, 0]);
//
//   expect(evaluator['openFour']).toEqual([1, 0]);
//
//   expect(evaluator['separateThree']).toEqual([0, 0]);
//
//   expect(evaluator['openThree'][0]).toBe(1);
//   expect(evaluator['openThree'][1]).toBe(0);
//
//   expect(evaluator['four'][0]).toBe(0);
//   expect(evaluator['four'][1]).toBe(2);
// });
//
// test('test advance visitor bot 3', () => {
//   let board = convertTxtToBoard('board3');
//   let patternManager = new PatternManager('X');
//   let evaluator = new AdvanceVisitor(patternManager);
//
//   BoardVisitor.accept(board, evaluator);
//
//   evaluator.finish();
//   console.log(evaluator);
//   // expect(evaluator['openTwo']).toEqual([4, 0]);
//
//   expect(evaluator['three']).toEqual([0, 0]);
//
//   // expect(evaluator['openThree']).toEqual([1, 0]);
//   // expect(evaluator['separateThree']).toEqual([0, 1]);
//   // expect(evaluator['openFour']).toEqual([0, 1]);
//   // expect(evaluator['four']).toEqual([0, 2]);
//   // expect(evaluator['five']).toEqual([0, 0]);
// });
