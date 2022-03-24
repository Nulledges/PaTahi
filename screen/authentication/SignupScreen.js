import React, {useReducer, useState, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {
  KeyboardAvoidingView,
  Pressable,
  Box,
  HStack,
  Text,
  Button,
  ScrollView,
} from 'native-base';
import CustomInput from '../../components/UI/CustomInput';
import {useDispatch} from 'react-redux';
import * as authenticationActions from '../../store/actions/authentication';
const UPDATE_SIGNUP = 'UPDATE_SIGNUP';

const signupReducer = (state, action) => {
  if (action.type === UPDATE_SIGNUP) {
    const updatedValues = {
      ...state.signupValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.signupValidities,
      [action.input]: action.isValid,
    };
    let updatedLogIsValid = true;
    for (key in updatedValidities) {
      updatedLogIsValid = updatedLogIsValid && updatedValidities[key];
    }
    return {
      signupIsValid: updatedLogIsValid,
      signupValues: updatedValues,
      signupValidities: updatedValidities,
    };
  }
  return state;
};

const SignupScreen = props => {
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const [signupState, dispatchSignupState] = useReducer(signupReducer, {
    signupValues: {
      email: '',
      password: '',
    },
    signupValidities: {
      email: false,
      password: false,
    },
    signupIsValid: false,
  });
  const authenticationHandler = () => {
    Keyboard.dismiss();
    if (!signupState.signupIsValid) {
      setInputError(true);
      return;
    }
    dispatch(
      authenticationActions.signupWithEmailandPassword(
        signupState.signupValues.email,
        signupState.signupValues.password,
      ),
    );
  };
  const inputChangeHandler = useCallback(
    (id, signupValue, signupValidity) => {
      dispatchSignupState({
        type: UPDATE_SIGNUP,
        value: signupValue,
        isValid: signupValidity,
        input: id,
      });
    },
    [dispatchSignupState],
  );
  return (
    <KeyboardAvoidingView behavior="position" flex="1" bgColor="white">
      <Pressable onPress={Keyboard.dismiss}>
        <Box alignItems="center">
          <Box
            maxWidth="375"
            maxHeight="375"
            mt="35%"
            h="100%"
            w="100%"
            borderRadius="sm"
            overflow="hidden"
            padding="10"
            borderWidth="1"
            shadow="1"
            bg="gray.200">
            <CustomInput
              //props send to customInput
              initialValue=""
              initiallyValid={false}
              required
              mail
              isRequired={true}
              errorOnClick={inputError}
              label="Email"
              pHolder="Enter your Email"
              errorMessage="Invalid email"
              //props to add on custom input
              id="email"
              onInputChange={inputChangeHandler}
              returnKeyType="done"
            />
            <CustomInput
              //props from customInput
              initialValue=""
              initiallyValid={false}
              required
              minLength={6}
              isRequired={true}
              errorOnClick={inputError}
              label="Password"
              pHolder="Enter your Password"
              helperText="Password must be 6 characters or longer."
              errorMessage="Invalid password"
              //props to add on custom input
              id="password"
              onInputChange={inputChangeHandler}
              type="password"
              returnKeyType="done"
            />
            <Button
              onPress={authenticationHandler}
              marginTop="5"
              isLoadingText="SIGNING UP">
              SIGN UP
            </Button>
          </Box>
        </Box>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
