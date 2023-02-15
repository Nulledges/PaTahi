import React, {useReducer, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Card from '../../Components/UI/Card';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import MainButton from '../../Components/UI/CustomButton/MainButton';
import * as authenticationActions from '../../store/actions/authentication';

const UPDATE_SIGNUP = 'UPDATE_SIGNUP';
const signupReducer = (state, action) => {
  if (action.type === UPDATE_SIGNUP) {
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

const SignupScreen = props => {
  const dispatch = useDispatch();

  const [inputError, setInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [inputState, dispatchInputState] = useReducer(signupReducer, {
    inputValues: {
      email: '',
      password: '',
      fullname: '',
      username: '',
    },
    inputValidities: {
      email: false,
      password: false,
      fullname: false,
      username: false,
    },
    formIsValid: false,
  });
  const authenticationHandler = () => {
    Keyboard.dismiss();
    if (!inputState.formIsValid) {
      setInputError(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        authenticationActions.signupWithEmailandPassword(
          inputState.inputValues.email,
          inputState.inputValues.password,
          inputState.inputValues.fullname,
          inputState.inputValues.username,
        ),
      );
      setIsLoading(false);
    }, 850);
  };
  const inputChangeHandler = useCallback(
    (id, signupValue, signupValidity) => {
      dispatchInputState({
        type: UPDATE_SIGNUP,
        value: signupValue,
        isValid: signupValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Card style={styles.itemContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
            <CustomInputWithLabel
              //props send to customInput
              initialValue=""
              initiallyValid={false}
              required
              isError={inputError}
              labelText="FULLNAME*"
              placeHolder="Enter your fullname"
              errorText="Invalid name!"
              //props to add on custom input
              id="fullname"
              onInputChange={inputChangeHandler}
              blurOnSubmit={false}
              onSubmitEditing={() => usernameRef.current.focus()}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputStyle}>
            <CustomInputWithLabel
              //props send to customInput
              initialValue=""
              initiallyValid={false}
              required
              isError={inputError}
              labelText="USERNAME*"
              placeHolder="Enter your username"
              errorText="Invalid username!"
              //props to add on custom input
              id="username"
              forwardRef={usernameRef}
              blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current.focus()}
              onInputChange={inputChangeHandler}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputStyle}>
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
              id="email"
              forwardRef={emailRef}
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current.focus()}
              onInputChange={inputChangeHandler}
              returnKeyType="next"
            />
          </View>
          <View>
            <CustomInputWithLabel
              //props from customInput
              initialValue=""
              initiallyValid={false}
              required
              minLength={6}
              maxLength={26}
              isError={inputError}
              labelText="PASSWORD*"
              placeHolder="Enter your password"
              errorText="Password must be 6 characters or longer."
              //props to add on custom input
              id="password"
              forwardRef={passwordRef}
              onSubmitEditing={authenticationHandler}
              onInputChange={inputChangeHandler}
              secureTextEntry={true}
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton label="SIGN UP" onPress={authenticationHandler} />
        </View>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputStyle: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
export default SignupScreen;
