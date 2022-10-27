import React, {useReducer, useState, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.signUpScreen}>
        <Card style={styles.signUpContainer}>
          <View style={styles.inputContainer}>
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
                onInputChange={inputChangeHandler}
                returnKeyType="done"
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  signUpContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
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

/* 
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
    </KeyboardAvoidingView> */
