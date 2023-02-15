import React, {useReducer, useCallback, useState, useEffect} from 'react';

import {TouchableOpacity, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import * as userActions from '../../store/actions/user';
import {useDispatch} from 'react-redux';
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
const ChangeUsernameScreen = props => {
  const username = props.route.params;
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    inputValues: {
      username: '',
    },
    inputValidities: {
      username: false,
    },
    inputIsValid: false,
  });

  useEffect( () => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={updateUsernameHandler}>
          <ScrollView>
            <Ionicons name="md-checkmark-sharp" size={24} color="black" />
          </ScrollView>
        </TouchableOpacity>
      ),
    });
  });
  const updateUsernameHandler = async () => {
    Keyboard.dismiss();
    if (!inputState.inputIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(
        userActions.updateUsername(
          inputState.inputValues.username,
          username.userId,
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
      style={styles.container}>
      <Card style={styles.itemsContainer}>
        <CustomInputWithLabel
          //props from customInput
          initialValue=""
          initiallyValid={false}
          required
          isError={inputError}
          labelText="Enter Username*"
          placeHolder="Enter username"
          errorText="Invalid username"
          //props to add on custom input
          id="username"
          onInputChange={inputChangeHandler}
          returnKeyType="done"
        />
        <MainButton
          onPress={updateUsernameHandler}
          label={username.username === '' ? 'SUBMIT' : 'UPDATE'}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
  },
  itemsContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
export default ChangeUsernameScreen;
