import React, {useReducer, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Card from '../../Components/UI/Card';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';

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
const ChangePasswordScreen = props => {
  const navigation = useNavigation();
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    inputValues: {
      password: '',
    },
    inputValidities: {
      password: false,
    },
    inputIsValid: false,
  });
  const UpdatePasswordHandler = async () => {
    Keyboard.dismiss();
    if (!inputState.inputIsValid) {
      setInputError(true);
      return;
    } else {
      const unsubscribe = auth().onAuthStateChanged(user => {
        user
          .updatePassword(inputState.inputValues.password)
          .then(props.navigation.navigate('ACCOUNTANDSECURITY'))
          .catch(error => {
            switch (error.code) {
              case 'auth/weak-password':
                Alert.alert(
                  'Error!',
                  'Password must be 6 characters or longer.',
                );
              case " case 'auth/weak-password':":
                Alert.alert('Error!', 'Requires Recent Login');
            }
          });
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
      style={styles.ChangePasswordScreen}>
      <Card style={styles.ChangePasswordScreenContainer}>
        <CustomInputWithLabel
          //props from customInput
          initialValue=""
          initiallyValid={false}
          required
          minLength={6}
          maxLength={26}
          isError={inputError}
          labelText="Enter New Password*"
          placeHolder="Enter New Password"
          errorText="Password must be 6 characters or longer."
          //props to add on custom input
          id="password"
          onInputChange={inputChangeHandler}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <MainButton onPress={UpdatePasswordHandler} label={'UPDATE'} />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  ChangePasswordScreen: {
    backgroundColor: '#E8E8E8',
  },
  ChangePasswordScreenContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
