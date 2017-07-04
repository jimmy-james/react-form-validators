'use strict';
var expect = require('chai').expect;
var validators = require('./index');
var messages = require('./index').errorMessages;
var beforeEach = require('mocha').beforeEach;

describe('isRequired method', () => {
  it('should return null', () => {
    expect(validators.isRequired('input')).to.equal(null);
  });
  it('should return "isRequired"', () => {
    expect(validators.isRequired('')).to.equal(messages.required);
  });
});

describe('minimumLen method', () => {
  let config = {
    min: 7
  },
    input = '';
  for (let i = 0; i < 6; i++) {
    input += 'i';
    it('should return a message', () => {
      expect(validators.minimumLen(input, config)).to.equal(messages.too_short);
    });
  }
});

describe('containsWhiteSpace', () => {
  let input = 'tes t';
  it('should return a message', () => {
    expect(validators.containsWhiteSpace(input)).to.equal(true);
  });
  it('should return null', () => {
    expect(validators.containsWhiteSpace('test')).to.equal(false);
  });
});

describe('containsTrailingSpace', () => {
  let text = ' test';
  it('should return a message', () => {
    expect(validators.containsTrailingSpace(text)).to.equal(messages.trailing_space);
  });
  it('should return null', () => {
    expect(validators.containsTrailingSpace(text.trim())).to.equal(null);
  });
});

describe('isNotANumber', () => {
  let num = 1;
  it('should return a message', () => {
    expect(validators.isNotANumber('string')).to.equal(messages.not_a_number);
  });
  it('should return null', () => {
    expect(validators.isNotANumber(num)).to.equal(null);
  });
});

describe('isNotInRange', () => {
  let lowNum = 1,
    midNum = 3,
    highNum = 7,
    config = {
      min: 2,
      max: 6
    };
  it('should return a message', () => {
    expect(validators.isNotInRange(lowNum, config)).to.equal(messages.not_in_range);
  });
  it('should return a message', () => {
    expect(validators.isNotInRange(highNum, config)).to.equal(messages.not_in_range);
  });
  it('should return null', () => {
    expect(validators.isNotInRange(midNum, config)).to.equal(null);
  });
});