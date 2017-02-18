class EvaluateVisitor {

  constructor(symbol) {
    this.currentCount = 0;
    this.oneEndOpening = false;
    this.currentSymbol = None;
    this.symbol = symbol;
  }

  increase(obj, attr) {
    obj[attr] = obj[attr] === null ? 0 : obj[attr] + 1;
  }

  visit(board, x, y, result) {
    if (board[x][y] == null) {
      if (this.oneEndOpening && this.currentCount == 3) {
        this.currentCount = 0;
        if (this.symbol == this.currentSymbol) {
          increase(result, 'ourOpenThree');
        } else if (this.currentSymbol != null) {
          increase(result, 'opponentOpenThree');
        }
      } else if (this.currentCount >= 4) {
        if (this.symbol == this.currentSymbol) {
          increase(result, 'ourFour');
        } else if (currentSymbol != null) {
          increase(result, 'opponentFour');
        }
      }
      this.currentCount = 0;
      this.oneEndOpening = true;
      this.currentSymbol = null;

    } else {

      if (board[x][y] != this.currentSymbol) {
        if (this.oneEndOpening && this.currentCount >= 4) {
          if (this.currentSymbol == this.symbol) {
            increase(result, 'ourFour');
          } else if (this.currentSymbol != null) {
            increase(result, 'opponentFour');
          }
        }
        this.currentSymbol = board[x][y];
        this.currentCount = 1;
      } else {
        this.currentCount++;
      }
    }
    return false;
  }
}


export default EvaluateVisitor;