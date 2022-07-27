import React, {useReducer, useState, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Card from '../../Components/UI/Card';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import MainButton from '../../Components/UI/CustomButton/MainButton';
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
    <View style={styles.authenticationScreen}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Card style={styles.authenticationContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <CustomInputWithLabel
                //props send to customInput
                initialValue=""
                initiallyValid={false}
                required
                mail
                isError={inputError}
                labelText="EMAIL ADDRESS*"
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
                isError={inputError}
                labelText="PASSWORD*"
                placeHolder="Enter your password"
                errorText="Invalid password"
                //props to add on custom input
                id="password"
                onInputChange={inputChangeHandler}
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('FORGOT PASSWORD');
              }}>
              <Text style={styles.textStyle}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton label="LOG IN" onPress={authenticationHandler} />
          </View>
        </Card>
        <Card style={styles.authenticationContainer}>
          <MainButton
            label="SIGN UP"
            onPress={() => {
              props.navigation.navigate('SIGN UP');
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  authenticationScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  authenticationContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 10,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    alignContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
export default LoginScreen;

{
  /* <KeyboardAvoidingView behavior="position" flex="1" bgColor="white">
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
    </KeyboardAvoidingView> */
}
