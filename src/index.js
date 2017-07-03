'use strict';

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin with a space',
  required: 'is required',
  not_a_number: 'is not a number',
  not_in_range: 'is not in range',
  user_exists_input_error: 'userAlreadyExists validator only accepts as the second argument: multi-dimensional array, array with objects, and array with strings',
  user_exists: 'already exists'
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

/* helper methods for userAlreadyExists */
const validateArrays = (input, users) => {
  let msg = null;
  var recurse = function(array, obj) {
    if (obj && obj.name && !Array.isArray(obj) && obj.name.toLowerCase().trim() === input.toLowerCase().trim() || obj && obj.username && !Array.isArray(obj) && obj.username.toLowerCase().trim() === input.toLowerCase().trim()) {
      msg = errorMessages.user_exists;
      return;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        recurse(array[i], array[i]);
      }
    }
  };
  for (let x = 0; x < users.length; x++) {
    recurse(users[x], null);
  }
  return msg;
};

const validateArrayOfObjects = (input, users) => {
  for (let i = 0; i < users.length; i++) {
    if (typeof users[i] === 'object' && users[i].name && users[i].name.toLowerCase().trim() === input.toLowerCase().trim()) {
      return errorMessages.user_exists;
    }
    if (typeof users[i] === 'object' && users[i].username && users[i].username.toLowerCase().trim() === input.toLowerCase().trim()) {
      return errorMessages.user_exists;
    }
  }
  return null;
};

const validateArrayOfStrings = (input, users) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].toLowerCase().trim() === input.toLowerCase().trim()) {
      return errorMessages.user_exists;
    }
  }
  return null;
};

const userAlreadyExists = (input, users) => {
  if (Array.isArray(users)) {
    if (Array.isArray(users[0])) {
      return validateArrays(input, users);
    }
    else if (typeof users[0] === 'object') {
      return validateArrayOfObjects(input, users);
    }
    else if (typeof users[0] === 'string') {
      return validateArrayOfStrings(users);
    }
  }
  else {
    throw errorMessages.user_exists_input_error;
  }
};

module.exports = {
  minimumLen: minimumLen,
  containsWhiteSpace: containsWhiteSpace,
  containsTrailingSpace: containsTrailingSpace,
  isRequired: isRequired,
  isNotANumber: isNotANumber,
  isNotInRange: isNotInRange,
  userAlreadyExists: userAlreadyExists
};


