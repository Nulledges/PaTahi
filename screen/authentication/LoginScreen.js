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
import {useDispatch} from 'react-redux';
import CustomInput from '../../components/UI/CustomInput';
//from Store---Redux
import * as authenticationActions from '../../store/actions/authentication';
//To avoid Spelling Mistakesf
const UPDATE_LOGIN = 'UPDATE_LOGIN';
//for useReducer
const loginReducer = (state, action) => {
  if (action.type === UPDATE_LOGIN) {
    const updatedValues = {
      ...state.loginValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.loginValidities,
      [action.input]: action.isValid,
    };
    let updatedLogIsValid = true;
    for (key in updatedValidities) {
      updatedLogIsValid = updatedLogIsValid && updatedValidities[key];
    }
    return {
      loginIsValid: updatedLogIsValid,
      loginValues: updatedValues,
      loginValidities: updatedValidities,
    };
  }
  return state;
};

const LoginScreen = props => {
  const [inputError, setInputError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();
  const [loginState, dispatchLoginState] = useReducer(loginReducer, {
    loginValues: {
      email: '',
      password: '',
    },
    loginValidities: {
      email: false,
      password: false,
    },
    loginIsValid: false,
  });
  const authenticationHandler = async () => {
    Keyboard.dismiss();
    if (!loginState.loginIsValid) {
      setInputError(true);
      return;
    } else {
      setDisableButton(true);
      dispatch(
        authenticationActions.loginWithEmailandPassword(
          loginState.loginValues.email,
          loginState.loginValues.password,
        ),
      );
    }
  };
  const inputChangeHandler = useCallback(
    (id, loginValue, loginValidity) => {
      dispatchLoginState({
        type: UPDATE_LOGIN,
        value: loginValue,
        isValid: loginValidity,
        input: id,
      });
    },
    [dispatchLoginState],
  );
  return (
    <KeyboardAvoidingView behavior="position" flex="1" bgColor="white">
      <Pressable onPress={Keyboard.dismiss}>
        <Box alignItems="center">
          <Box
            mt="35%"
            maxWidth="375"
            w="100%"
            maxHeight="400"
            h="100%"
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
              isRequired={true}
              errorOnClick={inputError}
              label="Password"
              pHolder="Enter your Password"
              errorMessage="Invalid password"
              //props to add on custom input
              id="password"
              onInputChange={inputChangeHandler}
              type="password"
              returnKeyType="done"
            />

            <HStack justifyContent="space-between" mt="5">
              <Pressable
                onPress={() => {
                  props.navigation.navigate('FORGOT PASSWORD');
                }}
                marginTop={1}
                isLoading={false}
                isLoadingText="LOGGING IN">
                <Text color="blue.500">Forgot Password?</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('SIGN UP');
                }}
                marginTop={1}
                isLoading={false}
                isLoadingText="LOGGING IN">
                <Text color="blue.500">Sign Up</Text>
              </Pressable>
            </HStack>

            <Button
              onPress={authenticationHandler}
              marginTop="5"
              isLoadingText="LOGGING IN"
              disabled={disableButton}>
              LOG IN
            </Button>
          </Box>
        </Box>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
