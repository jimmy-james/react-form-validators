'use strict';
/*
* validate for special characters
* validate for case-sensitivity
* validate password
* create a config option for messages, special characters, etc
* if no config object?
* accomodate project/application/company name exists
* email validation
* phone number for international
* major credit cards
* quantity
* create user
* currency
* timezone
* excluded strings or items or codes
* create user/password
* config (default to null):
*   caseSensitive: bool
*   inputLabelName: string
*   min: num
*   max: num
*   errorMessage: string
*   successMessage: string
*
* */

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin or end with a space',
  required: 'is required',
  not_a_number: 'is not a number',
  not_in_range: 'is not in range',
  exists_input_error: 'alreadyExists validator only accepts as the second argument: multi-dimensional array, array with objects, and array with strings',
  exists: 'already exists',
  email: 'invalid email format'
};

/* validation methods */
const minimumLen = (input, config) => {
  let len = input.length;
  return (len > 0) && (len < config.min) ?
    config.errorMessage || errorMessages.too_short :
    null;
};

const containsWhiteSpace = (input, config) => {
  return /\s/g.test(input) ?
    config.errorMessage || errorMessages.white_space :
    null;
};

const containsTrailingSpace = (input, config) => {
  return (input[ 0 ] === ' ') && (input.length > 0) || (input[ input.length -1 ] === ' ') && (input.length > 0) ?
    config.errorMessage || errorMessages.trailing_space :
    null;
};

const isRequired = (input, config) => {
  return !input ?
    config.errorMessage || errorMessages.required :
    null;
};

const isNotANumber = (num, config) => {
  return isNaN(num) ?
    config.errorMessage || errorMessages.not_a_number :
    null;
};

const isNotInRange = (num, config) => {
  return (num < config.min) || (num > config.max) ?
    config.errorMessage || errorMessages.not_in_range :
    null;
};

/* helper methods for alreadyExists */
const validateArrays = (input, data, config) => {
  let msg = null;
  var recurse = function(array, item) {
    if (item && item[config.inputLabelName] && !Array.isArray(item) && item[config.inputLabelName].toLowerCase().trim() === input.toLowerCase().trim()) {
      msg = config.errorMessage || errorMessages.exists;
      return;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        recurse(array[i], array[i]);
      }
    }
  };
  for (let x = 0; x < data.length; x++) {
    recurse(data[x], null);
  }
  return msg;
};

const validateArrayOfObjects = (input, data, config) => {
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === 'object' && data[i][config.inputLabelName] && data[i][config.inputLabelName].toLowerCase().trim() === input.toLowerCase().trim()) {
      return config.errorMessage || errorMessages.exists;
    }
  }
  return null;
};

const validateArrayOfStrings = (input, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].toLowerCase().trim() === input.toLowerCase().trim()) {
      return config.errorMessage || errorMessages.exists;
    }
  }
  return null;
};
/* END OF alreadyExists helper methods */

const alreadyExists = (input, data, config) => {
  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) {
      return validateArrays(input, data, config);
    }
    else if (typeof data[0] === 'object') {
      return validateArrayOfObjects(input, data, config);
    }
    else if (typeof data[0] === 'string') {
      return validateArrayOfStrings(input, data);
    }
  }
  else {
    console.error(errorMessages.user_exists_input_error);
  }
};

const validateEmail = (email, config) => {
  let isValidEmail;
  if (config.caseSensitive === true) {
    isValidEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
  }
  else {
    isValidEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
  }
  if (isValidEmail) {
    return null;
  }
  else {
    return config.errorMessage || errorMessages.email;
  }
};

module.exports = {
  errorMessages: errorMessages,
  minimumLen: minimumLen,
  containsWhiteSpace: containsWhiteSpace,
  containsTrailingSpace: containsTrailingSpace,
  isRequired: isRequired,
  isNotANumber: isNotANumber,
  isNotInRange: isNotInRange,
  alreadyExists: alreadyExists,
  validateEmail: validateEmail
};

