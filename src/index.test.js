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
    input = '',
    input2 = 'asdfas';
  it('should return a message when input is less than minimum length', () => {
    for (let i = 0; i < 6; i++) {
      input += 'i';
      expect(validators.minimumLen(input, config)).to.equal(messages.too_short);
    }
  });
  it('should return null when input is equal to or greater than minimum length', () => {
    for (let x = 0; x < 1; x++) {
      input2 += 'x';
      expect(validators.minimumLen(input2, config)).to.equal(null);
    }
  });
});

describe('containsWhiteSpace method', () => {
  let input = 'tes t';
  it('should return a message', () => {
    expect(validators.containsWhiteSpace(input)).to.equal(true);
  });
  it('should return null', () => {
    expect(validators.containsWhiteSpace('test')).to.equal(false);
  });
});

describe('containsTrailingSpace method', () => {
  let text = ' test',
    text2 = 'test ';
  it('should return a message', () => {
    expect(validators.containsTrailingSpace(text)).to.equal(messages.trailing_space);
  });
  it('should return a message', () => {
    expect(validators.containsTrailingSpace(text2)).to.equal(messages.trailing_space);
  });
  it('should return null', () => {
    expect(validators.containsTrailingSpace(text.trim())).to.equal(null);
  });
  it('should return null', () => {
    expect(validators.containsTrailingSpace(text2.trim())).to.equal(null);
  });
});

describe('isNotANumber method', () => {
  let num = 1;
  it('should return a message', () => {
    expect(validators.isNotANumber('string')).to.equal(messages.not_a_number);
  });
  it('should return null', () => {
    expect(validators.isNotANumber(num)).to.equal(null);
  });
});

describe('isNotInRange method', () => {
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

describe('alreadyExists method', () => {
  let input = 'richard',
    input2 = 'gavin',
    input3 = ' richard',
    input4 = 'richard ',
    arrayOfArrays = [
      [
        {
          name: 'richard'
        },
        {
          name: 'jan'
        },
        {
          name: 'ann'
        }
      ]
    ],
    arrayOfObjects = [
      {
        username: 'jan'
      },
      {
        username: 'richard'
      }
    ],
    arrayOfStrings = [
      'jill',
      'jack',
      'richard'
    ];
  const nameConfig = {
    inputLabelName: 'name'
  };
  const usernameConfig = {
    inputLabelName: 'username'
  };
  it('should return message when input exists in multi-dimensional array data', () => {
    expect(validators.alreadyExists(input, arrayOfArrays, nameConfig)).to.equal(messages.exists);
  });
  it('should return message when input exists in array of objects data', () => {
    expect(validators.alreadyExists(input, arrayOfObjects, usernameConfig)).to.equal(messages.exists);
  });
  it('should return message when input exists in array of strings data', () => {
    expect(validators.alreadyExists(input, arrayOfStrings)).to.equal(messages.exists);
  });
  it('should return null when input does not exist in multi-dimensional array', () => {
    expect(validators.alreadyExists(input2, arrayOfArrays, nameConfig)).to.equal(null);
  });
  it('should return null when input does not exist in array of objects', () => {
    expect(validators.alreadyExists(input2, arrayOfObjects, usernameConfig)).to.equal(null);
  });
  it('should return null when input does not exist in array of strings', () => {
    expect(validators.alreadyExists(input2, arrayOfStrings)).to.equal(null);
  });
  it('should return message when input exists in multi-dimensional array data and there is leading/trailing white-space in the input', () => {
    expect(validators.alreadyExists(input3, arrayOfArrays, nameConfig)).to.equal(messages.exists);
    expect(validators.alreadyExists(input4, arrayOfArrays, nameConfig)).to.equal(messages.exists);

  });
  it('should return message when input exists in array of objects data and there is leading/trailing white-space in the input', () => {
    expect(validators.alreadyExists(input3, arrayOfObjects, usernameConfig)).to.equal(messages.exists);
    expect(validators.alreadyExists(input4, arrayOfObjects, usernameConfig)).to.equal(messages.exists);

  });
  it('should return message when input exists in array of strings data and there is leading/trailing white-space in the input', () => {
    expect(validators.alreadyExists(input3, arrayOfStrings)).to.equal(messages.exists);
    expect(validators.alreadyExists(input4, arrayOfStrings)).to.equal(messages.exists);

  });
  it('should log an error message if the config object does not correctly specify inputLabelName for multi-dimensional array data', () => {

  });
  it('should log an error message if the config object does not correctly specify inputLabelName for array of objects data', () => {

  });
  it('should not be case-sensitive', () => {

  });
});