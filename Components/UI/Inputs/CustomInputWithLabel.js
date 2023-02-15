import React, {useReducer, useEffect} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';
import ErrorText from '../CustomText/ErrorText';
import HelperText from '../CustomText/HelperText';
import LabelText from '../CustomText/LabelText';
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
const CustomInputWithLabel = props => {
  //useReducer needs reducer which is inputReducer then it needs Initialvalue
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });
  const {id, onInputChange} = props;
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
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };
  return (
    <View style={styles.viewBorders}>
      <LabelText style={styles.labelText} labelText={props.labelText} />
      <TextInput
        placeholderTextColor={'#545454'}
        style={styles.textInput}
        {...props}
        placeholder={props.placeHolder}
        value={inputState.value}
        onBlur={lostFocusHandler}
        onChangeText={textChangeHandler}
        ref={props.forwardRef}
      
      />
      {!inputState.isValid && props.isError && (
        <ErrorText style={styles.errorText} errorText={props.errorText} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewBorders: {
    width: '100%',
    color: 'black',
  },
  labelText: {
    textTransform: 'uppercase',
    marginBottom: 10,
    color: 'black',
    fontSize: 15,
  },
  textInput: {
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 14,
    backgroundColor: '#E8E8E8',
    color: 'black',
  },
  errorText: {
    height: 30,
  },
});

export default CustomInputWithLabel;
