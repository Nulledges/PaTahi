import React, { useReducer, useEffect } from 'react';
import { Input, Box, FormControl, WarningOutlineIcon } from 'native-base';
//So that no spelling will be wrong below.
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
const CustomInput = props => {
  //useReducer needs reducer which is inputReducer then it needs Initialvalue
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });
  const { id, onInputChange } = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [id, onInputChange, inputState]);

  const textChangeHandler = text => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.mail && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.maxLength != null && text.length > props.maxLength) {
      isValid = false;
    }
    if (props.notSame != null && props.notSame !== text) {
      isValid = false;
    }
    if (props.onlyNumbers && text.replace(/[^0-9]/g, '')) {
      text = text.replace(/[^0-9]/g, '');
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!inputState.isValid && props.errorOnClick}>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Input
        {...props}
        variant="outline"
        size="sm"
        placeholder={props.pHolder}
        value={inputState.value}
        onBlur={lostFocusHandler}
        onChangeText={textChangeHandler}
        borderColor="black"
      />
      <FormControl.HelperText>{props.helperText}</FormControl.HelperText>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {props.errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
