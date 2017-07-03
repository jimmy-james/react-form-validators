'use strict';
var expect = require('chai').expect;
var validators = require('./index');
var beforeEach = require('mocha').beforeEach;

describe('isRequired method', () => {
  it('should return null', () => {
    expect(validators.isRequired('input')).to.equal(null);
  });
  it('should return "isRequired"', () => {
    expect(validators.isRequired('')).to.equal(validators.errorMessages.required);
  });
});

describe('minimumLen method', () => {
  var config = {
    min: 7
  },
    input = '';
  for (let i = 0; i < 6; i++) {
    input += "i"
    it('should return a message', () => {
      expect(validators.minimumLen(input, config)).to.equal(validators.errorMessages.too_short);
    });
  }
});
