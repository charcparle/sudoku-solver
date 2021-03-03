const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
let PnS = puzzlesAndSolutions[1]

suite('UnitTests', () => {
    test('#1 Logic handles a valid puzzle string of 81 characters', function(done) {
      let input = PnS[0];
      console.log("Running Unit test 1")
      assert.equal(solver.validate(input),'validated');
      done();
    });

    test('#2 Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
      let input = PnS[0].replace('1','a');
      let expected = { "error": "Invalid characters in puzzle" };
      console.log("Running Unit test 2")
      assert.deepEqual(solver.validate(input),expected);
      done();
    });

    test('#3 Logic handles a puzzle string that is not 81 characters in length', function(done) {
      let input = PnS[0].concat('.');
      let expected = { "error": "Expected puzzle to be 81 characters long" };
      console.log("Running Unit test 3")
      assert.deepEqual(solver.validate(input),expected);
      done();
    });

    test('#4 Logic handles a valid row placement', function(done) {
      let expected = true;
      console.log("Running Unit test 4")
      assert.equal(solver.checkRowPlacement(PnS[0],1,1,4),expected);
      done();
    });

    test('#5 Logic handles an invalid row placement', function(done) {
      let expected = false;
      console.log("Running Unit test 5")
      assert.equal(solver.checkRowPlacement(PnS[0],0,1,7),expected);
      done();
    });

    test('#6 Logic handles a valid column placement', function(done) {
      let expected = true;
      console.log("Running Unit test 6")
      assert.equal(solver.checkColPlacement(PnS[0],0,1,4),expected);
      done();
    });

    test('#7 Logic handles an invalid column placement', function(done) {
      let expected = false;
      console.log("Running Unit test 7")
      assert.equal(solver.checkColPlacement(PnS[0],0,1,8),expected);
      done();
    });

    test('#8 Logic handles a valid region (3x3 grid) placement', function(done) {
      let expected = true;
      console.log("Running Unit test 8")
      assert.equal(solver.checkRowPlacement(PnS[0],1,7,1),expected);
      done();
    });

    test('#9 Logic handles an invalid region (3x3 grid) placement', function(done) {
      let expected = false;
      console.log("Running Unit test 9")
      assert.equal(solver.checkRegionPlacement(PnS[0],1,7,7),expected);
      done();
    });

    test('#10 Valid puzzle strings pass the solver', function(done) {
      let input = PnS[0];
      let expected = PnS[1];
      console.log("Running Unit test 10")
      assert.equal(solver.solve(input),expected);
      done();
    });

    test('#11 Invalid puzzle strings fail the solver', function(done) {
      let input = '54.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
      let expected = null;
      console.log("Running Unit test 11")
      assert.equal(solver.solve(input),expected);
      done();
    });

    test('#12 Solver returns the the expected solution for an incomplete puzzzle', function(done) {
      let input = PnS[0];
      let expected = PnS[1];
      console.log("Running Unit test 12")
      assert.equal(solver.solve(input),expected);
      done();
    });

});
