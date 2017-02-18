class CheckGameStateVisitor {

  constructor() {
    this.currentCount = 0;
    this.currentSymbol = None;
  }

  visit(board, x, y, result) {
    let thisSymbol = board[x][y];
    if (thisSymbol !== null) {
      if (thisSymbol.equals(this.currentSymbol)) {
        this.currentCount += 1;
        if (this.currentCount == 5) {
          result.gameFinished = true;
          result.winner = this.currentSymbol;

          return true;
        }
      }
      else {
        this.currentSymbol = thisSymbol;
        this.currentCount = 1;
      }

    } else {
      this.currentSymbol = thisSymbol;
      this.currentCount = 0;
    }
    return false;
  }

}

export default CheckGameStateVisitor;