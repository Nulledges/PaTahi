import React, {useReducer, useState, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  View,
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

const forgetPasswordReducer = (state, action) => {
  if (action.type === UPDATE_FORGET_PASSWORD) {
    const updatedForgottenPassword = {
      ...state.forgetPasswordValue,
      [action.input]: action.value,
    };
    const updatedForgottenPasswordValidities = {
      ...state.forgetPasswordValidity,
      [action.input]: action.isValid,
    };
    let updatedForgottenIsValid = true;
    for (key in updatedForgottenPasswordValidities) {
      updatedForgottenIsValid =
        updatedForgottenIsValid && updatedForgottenPasswordValidities[key];
    }
    return {
      forgetPasswordisValid: updatedForgottenIsValid,
      forgetPasswordValue: updatedForgottenPassword,
      forgetPasswordValidity: updatedForgottenPasswordValidities,
    };
  }
  return state;
};
const ForgetPasswordScreen = props => {
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();

  const [forgetPasswordState, dispatchForgetPassword] = useReducer(
    forgetPasswordReducer,
    {
      forgetPasswordValue: {
        forgetPassword: '',
      },
      forgetPasswordValidity: {
        forgetPassword: false,
      },
      forgetPasswordisValid: false,
    },
  );
  const inputChangeHandler = useCallback(
    (id, forgetPasswordValue, forgetPasswordValidity) => {
      dispatchForgetPassword({
        type: UPDATE_FORGET_PASSWORD,
        value: forgetPasswordValue,
        isValid: forgetPasswordValidity,
        input: id,
      });
    },
    [dispatchForgetPassword],
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
    if (!forgetPasswordState.forgetPasswordisValid) {
      setInputError(true);
      return;
    } else {
      dispatch(
        autenticationActions.forgotPassword(
          forgetPasswordState.forgetPasswordValue.forgetPassword,
        ),
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.forgetPasswordScreen}>
        <Card style={styles.forgetPasswordContainer}>
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
              id="forgotPassword"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
            />
          </View>
          <View style={styles.buttonContainer}>
            <MainButton label="CONFIRM" onPress={confirmHandler} />
          </View>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  forgetPasswordScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  forgetPasswordContainer: {
    width: '100%',
    maxHeight: 400,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
