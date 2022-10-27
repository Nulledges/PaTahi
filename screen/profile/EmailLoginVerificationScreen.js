import React, {useReducer, useState, useCallback, useRef} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Card from '../../Components/UI/Card';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import MainButton from '../../Components/UI/CustomButton/MainButton';

import {useDispatch} from 'react-redux';
const UPDATE_VERIFY = 'UPDATE_VERIFY';
//for useReducer
const inputReducer = (state, action) => {
  if (action.type === UPDATE_VERIFY) {
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
const EmailLoginVerificationScreen = props => {
  const email = props.route.params;
  const [inputError, setInputError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const [loginState, dispatchLoginState] = useReducer(inputReducer, {
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
      setIsLoading(true);
      setTimeout(() => {
        auth()
          .currentUser.reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
              loginState.loginValues.email,
              loginState.loginValues.password,
            ),
          )
          .then(() => {
            props.navigation.navigate('CHANGEEMAIL', email);
          })
          .catch(error => {
            switch (error.code) {
              case 'auth/user-mismatch':
                Alert.alert('Error!', 'Please enter you current account');
              case 'auth/user-not-found':
                Alert.alert('Error!', 'User not fount');
              case 'auth/invalid-email':
                Alert.alert('Error!', 'Invalid email');
              case 'auth/wrong-password':
                Alert.alert('Error!', 'Wrong Password');
            }
          });

        setIsLoading(false);
      }, 850);
    }
  };
  const inputChangeHandler = useCallback(
    (id, loginValue, loginValidity) => {
      dispatchLoginState({
        type: UPDATE_VERIFY,
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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <Card style={styles.authenticationContainer}>
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
                forwardRef={passwordRef}
                onSubmitEditing={authenticationHandler}
                id="password"
                onInputChange={inputChangeHandler}
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton label="VERIFY" onPress={authenticationHandler} />
          </View>
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
  authenticationScreen: {
    flex: 1,
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
export default EmailLoginVerificationScreen;
