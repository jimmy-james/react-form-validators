'use strict';

module.exports = {
  minimumLen: minimumLen,
  containsWhiteSpace: containsWhiteSpace,
  containsTrailingSpace: containsTrailingSpace,
  isRequired: isRequired,
  isNotANumber: isNotANumber
};

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin with a space',
  required: 'is required',
  not_a_number: 'is not a number'
};

const minimumLen = (input, num) => {
  let len = input.length;
  return (len > 0) && (len < num) ?
    errorMessages.too_short :
    null;
};

const containsWhiteSpace = input => (
  /\s/g.test(input)
);

const containsTrailingSpace = input => {
  return input[ 0 ] === ' ' && input.length > 0 ?
    messages.trailing_space :
    null
};

const isRequired = input => {
  return !input ?
    errorMessages.required :
    null
};

const isNotANumber = num => {
  return isNaN(num) ?
    errorMessages.not_a_number :
    null
};

const isNotInRange = (num, range) => {
  
};
