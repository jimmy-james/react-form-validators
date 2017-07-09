'use strict';

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin or end with a space',
  required: 'is required',
  not_a_number: 'is not a number',
  not_in_range: 'is not in range',
  exists_input_error: 'alreadyExists validator only accepts as the second argument: multi-dimensional array, array with objects, and array with strings',
  exists: 'already exists',
  email: 'is invalid e-mail format',
  phone: 'is invalid U.S. phone number',
  zip_code: 'is invalid U.S. zip code'
};

/* validation methods */
const minimumLen = (input, config) => {
  let len = input.length;
  if (len > 0 && len < config.min) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.too_short;
    }
  }
  return null;
};

const isNotANumber = (num, config) => {
  if (isNaN(num)) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.not_a_number;
    }
  }
  return null;
};

const isNotInRange = (num, config) => {
  if (num < config.min || num > config.max) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.not_in_range;
    }
  }
  return null;
};

/* must not contain any white space */
const containsWhiteSpace = (input, config) => {
  if (/\s/g.test(input)) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.white_space;
    }
  }
  return null;
};

/* may contain white space - just not at the beginning or end */
const containsTrailingSpace = (input, config) => {
  if ((input[ 0 ] === ' ') && (input.length > 0) || (input[ input.length -1 ] === ' ') && (input.length > 0)) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.trailing_space;
    }
  }
  return null;
};

const isRequired = (input, config) => {
  if (!input) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.required;
    }
  }
  return null;
};

/* START alreadyExists helper methods */
const validateArrays = (input, data, config) => {
  let msg = null;
  var recurse = function(array, item) {
    if (item && item[config.inputLabelName] && !Array.isArray(item) && item[config.inputLabelName].toLowerCase().trim() === input.toLowerCase().trim()) {
      if (config && config.errorMessage) {
        msg = config.errorMessage;
      }
      else {
        msg = errorMessages.exists;
      }
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
      if (config && config.errorMessage) {
        return config.errorMessage;
      }
      else {
        return errorMessages.exists;
      }
    }
  }
  return null;
};

const validateArrayOfStrings = (input, data, config) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].toLowerCase().trim() === input.toLowerCase().trim()) {
      if (config && config.errorMessage) {
        return config.errorMessage;
      }
      else {
        return errorMessages.exists;
      }
    }
  }
  return null;
};
/* END of alreadyExists helper methods */

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
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.email;
    }
  }
  return null;
};

/*
  VALID FORMATS:
* 2125555555
* (212)-555-5555
* (212) 555-5555
* 212-555-5555
* +1-212-555-5555
* +1-212-555-5555 ext 77
* */
const validateUSPhoneNumber = (num, config) => {
  let isValidPhoneNum = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(num);
  if (isValidPhoneNum) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.phone;
    }
  }
  return null;
};

const validateUSZipCode = (code, config) => {
  let isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
  if (isValid) {
    if (config && config.errorMessage) {
      return config.errorMessage;
    }
    else {
      return errorMessages.zip_code;
    }
  }
  return null;
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
  validateEmail: validateEmail,
  validateUSPhoneNumber: validateUSPhoneNumber,
  validateUSZipCode: validateUSZipCode
};

