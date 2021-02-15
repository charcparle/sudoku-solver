class SudokuSolver {

  validate(puzzleString) {
    let rtn = {};
    let regex = /[1-9\.]/
    if (puzzleString.length!=81){
      rtn = {"error": "Expected puzzle to be 81 characters long"};
    } else if (!regex.test(puzzleString)) {
      rtn = { "error": "Invalid characters in puzzle" };
    } else {
      rtn = 'validated'
    }
    return rtn;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let regex=/[1-9]/
    if (!regex.test(value)) {
      return false;
    } else {
      let curRow = puzzleString.slice(row*9,row*9+8);
      console.log(`curRow: ${curRow}`);
      if (curRow.includes(value)) {
        return false;
      } else {
        return true;
      }
    }   
  }

  checkColPlacement(puzzleString, row, column, value) {
    let regex=/[1-9]/
    if (!regex.test(value)) {
      return false;
    } else {
      for (let i=0;i<9;i++){
        let puzzleString[row*9+column] = curPlace
        if (curPlace==value) return false;
      }
      return true;
    } 
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regex = /[1-9]/
    const rowReg = (row)=>(Math.floor(row/3));
    const colReg = (column)=>(Math.floor(column/3));  
    let curRowReg = rowReg(row);
    let curColReg = colReg(column);
    let regArr = puzzleString.filter((x,i)=>{
      if (rowReg(i)==curRowReg) {
        return true;
      } else {
        return false;
      }
    })
    
    let curReg = 0;
    const curArr = (row,col)=>{
      puzzleString[]
    }
    if (row<3) {
      if (col<3) {
        curReg = 0;
      } else if (col<6) {
        curReg = 1;
      } else {
        curReg = 2;
      }
    } else if (row<6) {
      if (col<3) {
        curReg = 3;
      } else if (col<6) {
        curReg = 4;
      } else {
        curReg = 5;
      }
    } else {
      if (col<3) {
        curReg = 6;
      } else if (col<6) {
        curReg = 7;
      } else {
        curReg = 8;
      }
    }
    
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

