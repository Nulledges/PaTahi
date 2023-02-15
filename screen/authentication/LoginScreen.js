import React, {useReducer, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [inputError, setInputError] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef(null);
  const [inputState, dispatchInputState] = useReducer(loginReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authenticationHandler = async () => {
    Keyboard.dismiss();
    if (!inputState.formIsValid) {
      setInputError(true);
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(
          authenticationActions.loginWithEmailandPassword(
            inputState.inputValues.email,
            inputState.inputValues.password,
          ),
        );
        setIsLoading(false);
      }, 850);
    }
  };
  const inputChangeHandler = useCallback(
    (id, loginValue, loginValidity) => {
      dispatchInputState({
        type: UPDATE_LOGIN,
        value: loginValue,
        isValid: loginValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );

  return (
    <View style={styles.container}>
      <ScrollView
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
                mail
                isError={inputError}
                labelText="EMAIL ADDRESS*"
                placeHolder="Enter your email"
                errorText="Invalid email!"
                //props to add on custom input
                id="email"
                onInputChange={inputChangeHandler}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType="next"
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
                forwardRef={passwordRef}
                onSubmitEditing={authenticationHandler}
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
        <Card style={styles.itemContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
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
