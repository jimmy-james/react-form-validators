'use strict';

module.exports = {
  minimumLen: minimumLen,
  containsWhiteSpace: containsWhiteSpace,
  containsTrailingSpace: containsTrailingSpace,
  isRequired: isRequired,
  isNotANumber: isNotANumber,
  isNotInRange: isNotInRange,
  userAlreadyExists: userAlreadyExists
};

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin with a space',
  required: 'is required',
  not_a_number: 'is not a number',
  not_in_range: 'is not in range',
  user_exists_input_error: 'userAlreadyExists validator only accepts as the second argument: multi-dimensional array, array with objects, and array with strings'
};

/* helper methods for nameAlreadyExists */
const validateArrays = users => {

};

const validateArrayOfObjects = users => {

};

const validateArrayOfStrings = users => {

};

/* validation methods */
const minimumLen = (input, minLen) => {
  let len = input.length;
  return (len > 0) && (len < minLen) ?
    errorMessages.too_short :
    null;

};

const containsWhiteSpace = input => (
  /\s/g.test(input)
);
const containsTrailingSpace = input => {
  return (input[ 0 ] === ' ') && (input.length > 0) ?
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

const isNotInRange = (num, rangeArray) => {
  return (num < rangeArray[0]) || (num > rangeArray[1]) ?
    errorMessages.not_in_range :
    null
};

const userAlreadyExists = (input, users) => {
  if (Array.isArray(users)) {
    if (Array.isArray(users[0])) {
      return validateArrays(users);
    }
    else if (typeof users[0] === 'object') {
      return validateArrayOfObjects(users);
    }
    else if (typeof users[0] === 'string') {
      return validateArrayOfStrings(users);
    }
  }
  else {
    throw errorMessages.user_exists_input_error;
  }
};



