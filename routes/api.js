'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzleStr = req.body.puzzle;
      let coor = req.body.coordinate.toLowerCase();
      let val = req.body.value;
      console.log(puzzleStr, coor, val);

      let row = coor.charCodeAt(0)-97;
      let col = coor[1]-1;
      console.log(`row: ${row}, col: ${col}`)
      let coorRegex = /^[a-zA-Z][1-9]$/;
      let valRegex = /^[1-9]{1}$/;
      if (solver.validate(puzzleStr) != 'validated') {
        console.log(solver.validate(puzzleStr))
        res.json(solver.validate(puzzleStr));
      } else if (!coorRegex.test(coor)) {
        res.json({ "error": "Invalid coordinate" });
      } else if (!valRegex.test(val)){
        res.json({"error": "Invalid value" });
      } else {
        let rowCheck = solver.checkRowPlacement(puzzleStr, row, col, val);
        let colCheck = solver.checkColPlacement(puzzleStr, row, col, val);
        let regCheck = solver.checkRegionPlacement(puzzleStr, row, col, val);
        let validity = true;
        let confArr = [];
        if (rowCheck == true && colCheck == true && regCheck == true) {
          validity = true;
          res.json({ "valid": validity });
        } else {
          validity = false;
          !rowCheck && confArr.push("row");
          !colCheck && confArr.push("column");
          !regCheck && confArr.push("region");
          res.json({ "valid": validity, "conflict": confArr })
        }
      }

    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzleStr = req.body.puzzle
      console.log(`puzzleStr: ${puzzleStr}`)
      let result = solver.solve(puzzleStr);
      if (result==null){
        res.json({ "error": "Puzzle cannot be solved" });
      } else {
        console.log(result);
        res.json(result);
      }
    });
};
