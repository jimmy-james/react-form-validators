/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
* remember to validate for special characters
* validate for case-sensitivity
* validate password
* create a config option for messages, special characters, etc
* accomodate project/application/company name exists
* email validation
* phone number for international
* major credit cards
* quantity
* currency
* timezone
* excluded strings or items or codes
* create user/password
* */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin with a space',
  required: 'is required',
  not_a_number: 'is not a number',
  not_in_range: 'is not in range',
  exists_input_error: 'alreadyExists validator only accepts as the second argument: multi-dimensional array, array with objects, and array with strings',
  exists: 'already exists'
};

/* validation methods */
var minimumLen = function minimumLen(input, config) {
  var len = input.length;
  return len > 0 && len < config.min ? errorMessages.too_short : null;
};

var containsWhiteSpace = function containsWhiteSpace(input) {
  return (/\s/g.test(input)
  );
};

var containsTrailingSpace = function containsTrailingSpace(input) {
  return input[0] === ' ' && input.length > 0 ? messages.trailing_space : null;
};

var isRequired = function isRequired(input) {
  return !input ? errorMessages.required : null;
};

var isNotANumber = function isNotANumber(num) {
  return isNaN(num) ? errorMessages.not_a_number : null;
};

var isNotInRange = function isNotInRange(num, config) {
  return num < config.min || num > config.max ? errorMessages.not_in_range : null;
};

/* helper methods for alreadyExists */
var validateArrays = function validateArrays(input, data, label) {
  var msg = null;
  var recurse = function recurse(array, item) {
    if (item && item[label] && !Array.isArray(item) && item[label].toLowerCase().trim() === input.toLowerCase().trim()) {
      msg = errorMessages.exists;
      return;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        recurse(array[i], array[i]);
      }
    }
  };
  for (var x = 0; x < data.length; x++) {
    recurse(data[x], null);
  }
  return msg;
};

var validateArrayOfObjects = function validateArrayOfObjects(input, data, label) {
  for (var i = 0; i < data.length; i++) {
    if (_typeof(data[i]) === 'object' && data[i][label] && data[i][label].toLowerCase().trim() === input.toLowerCase().trim()) {
      return errorMessages.exists;
    }
  }
  return null;
};

var validateArrayOfStrings = function validateArrayOfStrings(input, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].toLowerCase().trim() === input.toLowerCase().trim()) {
      return errorMessages.exists;
    }
  }
  return null;
};
/* END OF alreadyExists helper methods */

var alreadyExists = function alreadyExists(input, data, config) {
  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) {
      return validateArrays(input, data, config.inputLabelName);
    } else if (_typeof(data[0]) === 'object') {
      return validateArrayOfObjects(input, data, config.inputLabelName);
    } else if (typeof data[0] === 'string') {
      return validateArrayOfStrings(input, data);
    }
  } else {
    throw errorMessages.user_exists_input_error;
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
  alreadyExists: alreadyExists
};

/***/ })
/******/ ]);