const { Before, Given, When, Then } = require('cucumber');
const Calculator = require('../lib/calculator');

let calculator;

Given('the numbers {int} and {int}', (x, y, callback) => {
  calculator = new Calculator(x, y);
  callback();
});

When('they are added together', callback => {
  // Write code here that turns the phrase above into concrete actions
  callback(null, 'pending');
});

Then('should the result be {int}', (int, callback) => {
  // Write code here that turns the phrase above into concrete actions
  callback(null, 'pending');
});
