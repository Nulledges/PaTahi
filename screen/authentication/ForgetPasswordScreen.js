import React, {useReducer, useState, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  View,
  ScrollView,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import Card from '../../Components/UI/Card';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';

import * as autenticationActions from '../../store/actions/authentication';
import MainButton from '../../Components/UI/CustomButton/MainButton';
const UPDATE_FORGET_PASSWORD = 'UPDATE_FORGET_PASSWORD';
/* const FORM_RESET = 'FORM_RESET'; */

const forgetPasswordReducer = (state, action) => {
  if (action.type === UPDATE_FORGET_PASSWORD) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};
const ForgetPasswordScreen = props => {
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();

  const [inputState, dispatchInputState] = useReducer(forgetPasswordReducer, {
    inputValues: {
      forgetPassword: '',
    },
    inputValidities: {
      forgetPassword: false,
    },
    formIsValid: false,
  });
  const inputChangeHandler = useCallback(
    (id, forgetPasswordValue, forgetPasswordValidity) => {
      dispatchInputState({
        type: UPDATE_FORGET_PASSWORD,
        value: forgetPasswordValue,
        isValid: forgetPasswordValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  /*   const forgotPassword = Email => {
    auth()
      .sendPasswordResetEmail(Email)
      .then(() => {
        Alert.alert('Sent successfully!', 'Please check your email!', [
          {text: 'Okay'},
        ]);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Email Error!', 'Invalid Email!', [{text: 'Okay'}]);
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Email Error!', 'User not found.', [{text: 'Okay'}]);
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert('Email Error!', 'Too many request try again later!.', [
            {text: 'Okay'},
          ]);
        }
      });
  }; */
  const confirmHandler = () => {
    Keyboard.dismiss();
    if (!inputState.formIsValid) {
      setInputError(true);
      return;
    }
    dispatch(
      autenticationActions.forgotPassword(
        inputState.inputValues.forgetPassword,
      ),
      props.navigation.goBack(),
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Card style={styles.itemContainer}>
        <View style={styles.inputContainer}>
          <CustomInputWithLabel
            //props send to customInput
            initialValue=""
            initiallyValid={false}
            required
            mail
            isError={inputError}
            labelText="EMAIL*"
            placeHolder="Enter your email"
            errorText="Invalid email!"
            //props to add on custom input
            id="forgetPassword"
            onInputChange={inputChangeHandler}
            returnKeyType="done"
          />
        </View>
        <View style={styles.buttonContainer}>
          <MainButton label="CONFIRM" onPress={confirmHandler} />
        </View>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 400,
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
export default ForgetPasswordScreen;
