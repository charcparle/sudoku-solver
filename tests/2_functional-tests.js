const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
//console.log(puzzlesAndSolutions)
chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('#1 Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
          console.log('Running test #1');
          let PnS = puzzlesAndSolutions[0];
          console.log(PnS);
          chai.request(server)
            .post('/api/solve')
            .send({"puzzle": PnS[0]})
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.equal(res.body.solution, PnS[1]);
              done();
            })
          
        });

  test('#2 Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
          console.log('Running test #2');
          let expected = { 'error': 'Required field missing' }
          chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#3 Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
          console.log('Running test #3');
          let expected = { 'error': 'Invalid characters in puzzle' }
          let input = puzzlesAndSolutions[0][0]
          input = input.replace('1','a')
          console.log(input);
          chai.request(server)
            .post('/api/solve')
            .send({"puzzle":input})
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#4 Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
          console.log('Running test #4');
          let expected = { 'error': 'Expected puzzle to be 81 characters long' }
          let input = puzzlesAndSolutions[0][0]
          input = input.replace('1','')
          console.log(input);
          chai.request(server)
            .post('/api/solve')
            .send({"puzzle":input})
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#5 Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
          console.log('Running test #5');
          let expected = { 'error': 'Puzzle cannot be solved' }
          let input = '6.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
          console.log(input);
          chai.request(server)
            .post('/api/solve')
            .send({"puzzle":input})
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#6 Check a puzzle placement with all fields: POST request to /api/check', function(done) {
          console.log('Running test #6');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2',
            'value': '3'
          }
          let expected = { "valid": true };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#7 Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
          console.log('Running test #7');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2',
            'value': '9'
          }
          let expected = { "valid": false, "conflict": [ "column" ] };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#8 Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
          console.log('Running test #8');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2',
            'value': '1'
          }
          let expected = { "valid": false, "conflict": [ "row", "region" ] };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#9 Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
          console.log('Running test #9');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2',
            'value': '2'
          }
          let expected = { "valid": false, "conflict": [ "row", "column", "region" ] };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#10 Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
          console.log('Running test #10');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2'
          }
          let expected = { "error": "Required field(s) missing" };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#11 Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
          console.log('Running test #11');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0].replace('1','a'),
            'coordinate': 'a2',
            'value': '3'
          }
          let expected = { "error": "Invalid characters in puzzle" };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#12 Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
          console.log('Running test #12');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0].concat('.'),
            'coordinate': 'a2',
            'value': '3'
          }
          let expected = { "error": "Expected puzzle to be 81 characters long" };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#13 Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
          console.log('Running test #13');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'aa',
            'value': '3'
          }
          let expected = { "error": "Invalid coordinate" };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

  test('#14 Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
          console.log('Running test #14');
          let PnS = puzzlesAndSolutions[0];
          let input = {
            'puzzle': PnS[0],
            'coordinate': 'a2',
            'value': 'a'
          }
          let expected = { "error": "Invalid value" };
          chai.request(server)
            .post('/api/check')
            .send(input)
            .end((err,res)=>{
              assert.equal(res.status, 200);
              assert.deepEqual(res.body, expected);
              done();
            })
          
        });

});


