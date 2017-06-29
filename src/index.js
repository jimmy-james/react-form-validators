'use strict';

module.exports = {
  minimumLen: minimumLen
};

const errorMessages = {
  too_short: 'is too short',
  white_space: 'must not contain spaces',
  trailing_space: 'must not begin with a space',
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

const