class SudokuSolver {

  validate(puzzleString) {
    let rtn = {};
    let regex = /[1-9\.]/
    if (puzzleString.length != 81) {
      rtn = { "error": "Expected puzzle to be 81 characters long" };
    } else if (!regex.test(puzzleString)) {
      rtn = { "error": "Invalid characters in puzzle" };
    } else {
      rtn = 'validated'
    }
    return rtn;
  }

  // row & column to be inputted as index (0-8)
  checkRowPlacement(puzzleString, row, column, value) {
    let regex = /[1-9]/
    if (!regex.test(value)) {
      return false;
    } else {
      let curRow = puzzleString.slice(row * 9, row * 9 + 9);
      //console.log(`curRow: ${curRow}`);
      if (curRow.includes(value*1)) {
        return false;
      } else {
        return true;
      }
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    let regex = /[1-9]/
    if (!regex.test(value)) {
      return false;
    } else {
      for (let i = 0; i < 9; i++) {
        let curPlace = puzzleString[i*9 + column]
        if (curPlace == value*1) return false;
      }
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regex = /[1-9]/
    if (!regex.test(value)) return false;

    const rowReg = (row) => (Math.floor(row / 3));
    const colReg = (column) => (Math.floor(column / 3));
    let curRowReg = rowReg(row);
    let curColReg = colReg(column);
    //console.log(`curRowReg: ${curRowReg}`)
    //console.log(`curColReg: ${curColReg}`)
    let regArr = puzzleString.split("");
    //console.log(`regArr before: ${regArr}`)
    regArr = regArr.filter((x, i) => {
      if (rowReg(Math.floor(i / 9)) == curRowReg && colReg((i % 9)) == curColReg) {
        return true;
      } else {
        return false;
      }
    })
    console.log(`regArr: ${regArr}`)

    if (regArr.includes(value*1)) {
      return false;
    } else {
      return true;
    }
  }

  solve(puzzleString) {
    if (!puzzleString.includes('.')){
      console.log(`solved!: ${puzzleString}`)
      return puzzleString;
    } else {
      let place = puzzleString.indexOf('.');
      console.log(`place: ${place}`)
      for (let i=1;i<=9;i++){
        let row = Math.floor(place/9);
        let col = place%9;
        console.log(`row: ${row}, col: ${col}`)
        let nextStr = puzzleString.slice(0,place).concat(i,puzzleString.slice(place+1,));
        let n = i.toString();
        console.log(n);
        let checked = this.checkRowPlacement(puzzleString,row,col,n)
                      && this.checkRowPlacement(puzzleString,row,col,n)
                      && this.checkRegionPlacement(puzzleString,row,col,n)
        console.log(`checkRegionPlacement: ${this.checkRegionPlacement(puzzleString,row,col,n)}`)
        console.log(`checked: ${checked}`)
        if (checked) {
          console.log(`nextStr: ${nextStr}`)
          return this.solve(nextStr);
        }
        console.log(i)
      }
      
      return null
    }
  }
}

module.exports = SudokuSolver;

