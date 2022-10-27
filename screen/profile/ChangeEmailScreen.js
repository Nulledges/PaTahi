import React, {useReducer, useCallback, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';

//To avoid Spelling Mistakes
const UPDATE_INPUT = 'UPDATE_INPUT';
//for useReducer
const inputReducer = (state, action) => {
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
const ChangeEmailScreen = props => {
  const email = props.route.params;
  const navigation = useNavigation();
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    inputValues: {
      email: '',
    },
    inputValidities: {
      email: false,
    },
    inputIsValid: false,
  });
  const UpdateEmailHandler = async () => {
    Keyboard.dismiss();
    if (!inputState.inputIsValid) {
      setInputError(true);
      return;
    } else {
      const unsubscribe = auth().onAuthStateChanged(user => {
        user
          .updateEmail(inputState.inputValues.email)
          .then(
            firestore()
              .collection('Users')
              .doc(email.docId)
              .update({email: inputState.inputValues.email})
              .then(props.navigation.navigate('ACCOUNTANDSECURITY')),
          );
      });
      return unsubscribe();
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
      style={styles.ChangeEmailScreen}>
      <Card style={styles.ChangeEmailScreenContainer}>
        <CustomInputWithLabel
          //props from customInput
          initialValue=""
          initiallyValid={false}
          required
          mail
          isError={inputError}
          labelText="Enter Email*"
          placeHolder="Enter Email"
          errorText="Invalid Email"
          //props to add on custom input
          id="email"
          onInputChange={inputChangeHandler}
          returnKeyType="done"
        />
        <MainButton
          onPress={UpdateEmailHandler}
          label={email.email === '' ? 'SUBMIT' : 'UPDATE'}
        />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  ChangeEmailScreen: {
    backgroundColor: '#E8E8E8',
  },
  ChangeEmailScreenContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default ChangeEmailScreen;
