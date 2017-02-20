import convertTxtToBoard from '../utilities/convertTxtToBoard.jsx';

test('create board 1', () => {
  let board1 = convertTxtToBoard('board1');
  expect(board1.get(1, 0)).toBe('X');
  expect(board1.get(1, 1)).toBe('O');

  board1.set(1, 1, 'X');
  expect(board1.get(1, 1)).toBe('X');
});