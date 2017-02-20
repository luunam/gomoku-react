import Board from '../../app/components/Board';
import fs from 'fs';

function convertTxtToBoard(filename) {
  let board = null;

  try {
    let data = fs.readFileSync(__dirname + '/../resources/' + filename).toString();


    let idx = 0;
    while(data.charAt(idx) != '\n') {
      idx++;
    }

    let size = parseInt(data.substring(0, idx));
    board = new Board({size: size});

    let row = 0;
    let col = 0;
    for (let i = idx+1; i < data.length; i++) {
      if (data.charAt(i) == '\n') {
        row++;
        col = 0;
      } else {
        if (data.charAt(i) != '~') {
          board.set(row, col, data.charAt(i));
        }
        col++;
      }
    }
  } catch (err) {
    console.log('ERR: ' + err);
  }

  return board;
}

export default convertTxtToBoard;