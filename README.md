# react-form-validators
##### *Lightweight form validation library and methodology for ReactJS*

##### To Install
``npm install --save react-form-validators``

## Table of Contents

1. [Validation Methods](#validation-methods)
2. [Configurations](#configurations)
3. [React Validation Approach](#react-validation-approach)

## Validation Methods
- 1.1 The **minimumLen** method takes input as the first argument. It also takes a config object with a *required* **min** property as the second argument.
````
    const configObj = {
      min: num
    };
    minimumLen(userInput [, configObj])
    // if input is shorter than min, will return 'is too short' by default
````
- 1.2 The **containsWhiteSpace** method takes input as the first argument and an *optional* config object as a second argument.
````
    containsWhiteSpace(userInput [, configObj])
    // if input has white space, will return 'must not contain white space' by default
````
- 1.3 The **containsTrailingSpace** method takes input as the first argument and an *optional* config object as a second argument.
````
     containsTrailingSpace(userInput [, configObj])
     // only returns 'must not begin or end with a space' by default, if input begins or end with a space
````
- 1.4 The **isRequired** method takes input as the first argument and an *optional* config object as a second argument.
````
     isRequired(userInput [, configObj])
     // if input is empty after initial typing, returns 'is required' by default
````
- 1.5 The **isNotANumber** method takes input as the first argument and an *optional* config object as a second argument.
````
     isNotANumber(userInput, [, configObj])
     // if input is NaN, returns 'is not a number' by default
````
- 1.6 The **isNotInRange** method takes input as the first argument. It also takes a config object with *required* **min** & **max** properties as the second argument.
````
    const configObj = {
      min: num,
      max: num
    };
     isNotInRange(userInput [, configObj])
     // if input < min || input > max, will return 'is not in range' by default
````
- 1.7 The **alreadyExists** method takes input as the first argument. It takes two additional *required* args:
  - Data array: two-dimensional array, array of objects, or array of strings
  - Config object with a *required* **inputLabelName** property, which specifies the property you want to test for existence.
````
    const configObj = {
      inputLabelName: 'String' (e.g. 'username')
    };
    alreadyExists(userInput [data, configObj])
    // if inputLabelName exists in the provided data structure, will return 'already exists' by default
````
- 1.8 The **validateEmail** method takes input as the first argument. It also takes a config object with an *optional* **caseSensitive** property as the second argument.
````
    const configObj = {
      caseSensitive: boolean
    }
    validateEmail(email [, configObj])
    // if email format is invalid, will return 'is invalid e-mail format' by default
````
- 1.9 The **validateEmail** method takes input as the first argument and an *optional* config object as a second argument.
````
    validateUSPhoneNumber(number [, configObj])
    // if number is not a valid U.S. phone number, will return 'is invalid U.S. phone number' by default

    /*
      VALID FORMATS:
    * 2125555555
    * (212)-555-5555
    * (212) 555-5555
    * 212-555-5555
    * +1-212-555-5555
    * +1-212-555-5555 ext 77
    * */
````
- ... And there's more to come!

## Configurations

- Every method can handle a config object with the errorMessage (String) property for custom messages.

## React Validation Approach

- *Install* and *import* **react-form-validators**
````
import { Component } from 'react';
/* import validator methods */
import { containsWhiteSpace, isNotInRange } from 'react-form-validators';
/* make them iterable */
const methods = [containsWhiteSpace, isNotInRange];

class InputField extends Component {
  constructor(props) {
    super();
    this.state = {
      value: ''
    }
  }
  /* Example: capture input value in component state */
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    let { value } = this.state,
        errorMsg,
        errorNode;
    /* Loop over methods, save its return value to errorMsg variable */
    methods.some(method => {
      errorMsg = method(value);
      return errorMsg;
    });
    /* if the method returns a message, render it to a 'p' tag */
    if (errorMsg) {
      errorNode = <p>{ errorMsg }</p>
    }

    /* the node below will render only if the method returns a message */
    return (
      <div>
        <input onChange={ this.handleChange } value={ this.state } />
        { errorNode }
      </div>
    );
  }
}
export default InputField;

````



