import React, {useReducer, useCallback, useState} from 'react';

import {View, Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import * as userActions from '../../store/actions/user';
import {useDispatch} from 'react-redux';
//To avoid Spelling Mistakes
const UPDATE_INPUT = 'UPDATE_INPUT';
//for useReducer
const loginReducer = (state, action) => {
  if (action.type === UPDATE_INPUT) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedInputIsValid = true;
    for (key in updatedValidities) {
      updatedInputIsValid = updatedInputIsValid && updatedValidities[key];
    }
    return {
      inputIsValid: updatedInputIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};
const ChangeNumberScreen = props => {
  const number = props.route.params;
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const [inputState, dispatchInputState] = useReducer(loginReducer, {
    inputValues: {
      number: '',
    },
    inputValidities: {
      number: false,
    },
    inputIsValid: false,
  });
  const UpdateNumberHandler = async () => {
    Keyboard.dismiss();
    if (!inputState.inputIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(
        userActions.updatePhoneNumber(
          inputState.inputValues.number,
          number.docId,
        ),
        props.navigation.goBack(),
      );
    }
  };
  const inputChangeHandler = useCallback(
    (id, inputValues, inputValidity) => {
      dispatchInputState({
        type: UPDATE_INPUT,
        value: inputValues,
        isValid: inputValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      style={styles.ChangeNumberScreen}>
      <Card style={styles.ChangeNumberScreenContainer}>
        <CustomInputWithLabel
          //props from customInput
          initialValue=""
          initiallyValid={false}
          required
          onlyNumbers
          isError={inputError}
          maxLength={11}
          labelText="Enter Phone Number*"
          placeHolder="Enter Phone Number"
          errorText="Invalid number"
          //props to add on custom input
          id="number"
          onInputChange={inputChangeHandler}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <MainButton
          onPress={UpdateNumberHandler}
          label={number.phoneNumber === '' ? 'SUBMIT' : 'UPDATE'}
        />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  ChangeNumberScreen: {
    backgroundColor: '#E8E8E8',
  },
  ChangeNumberScreenContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default ChangeNumberScreen;
