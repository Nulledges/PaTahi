import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Card from '../../Components/UI/Card';
import CustomInputWithLabel from '../../Components/UI/Inputs/CustomInputWithLabel';
import MainButton from '../../Components/UI/CustomButton/MainButton';
const UPDATEMEASUREMENT = 'UPDATEMEASUREMENT';
//for useReducer
const measurementReducer = (state, action) => {
  if (action.type === UPDATEMEASUREMENT) {
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
const MyMeasurementBookScreen = props => {
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(false);
  const upperBodyMeasurementsValidities = {
    name: false,
    chest: false,
    shoulder: false,
    biceps: false,
    triceps: false,
    forearms: false,
    waist: false,
    hips: false,
    neck: false,
    upperBack: false,
    lowerBack: false,
  };
  const upperBodyMeasurementsValues = {
    name: '',
    chest: '',
    shoulder: '',
    biceps: '',
    triceps: '',
    forearms: '',
    waist: '',
    hips: '',
    neck: '',
    upperBack: '',
    lowerBack: '',
  };

  const [inputState, dispatchInputState] = useReducer(measurementReducer, {
    inputValues: upperBodyMeasurementsValues,
    inputValidities: upperBodyMeasurementsValidities,
    formIsValid: false,
  });
  /*  console.log(inputState.inputValues); */
  /*  console.log(Object.keys(upperBodyMeasurementsValues).map(key=> key)) */
  /* upperBodyMeasurementsValues['hands'] = '';
  console.log(inputState.inputValues); */
  const measurementHandler = async () => {
    console.log(!inputState.formIsValid);
    if (!inputState.formIsValid) {
      console.log(inputState.inputValidities);
      console.log(inputState.inputValues);
      setInputError(true);
    } else {
      console.log(inputState.inputValidities);
      console.log(inputState.inputValues);
      setInputError(true);
    }
    Keyboard.dismiss();
    /*   if (!inputState.formIsValid) {
      setInputError(true);
      return;
    } else {
      setIsLoading(true);
      console.log(inputState.inputValues);
    } */
  };
  const inputChangeHandler = useCallback(
    (id, measurementValue, measurementValidity) => {
      dispatchInputState({
        type: UPDATEMEASUREMENT,
        value: measurementValue,
        isValid: measurementValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: '100%',
          height: '90%',
          marginBottom: '19%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: '2%',
        }}>
        <Card style={styles.CardContainer}>
          {Object.keys(upperBodyMeasurementsValues).map(key => {
            if (key === 'name') {
              return (
                <CustomInputWithLabel
                  //props send to customInput
                  initialValue=""
                  initiallyValid={false}
                  required
                  isError={inputError}
                  labelText={key}
                  placeHolder={`Enter your ${key}`}
                  errorText={`Invalid ${key}`}
                  //props to add on custom input
                  id={key}
                  key={key}
                  onInputChange={inputChangeHandler}
                  returnKeyType="done"
                />
              );
            } else {
              return (
                <CustomInputWithLabel
                  //props send to customInput
                  initialValue=""
                  initiallyValid={false}
                  required
                  onlyNumbers
                  isError={inputError}
                  labelText={key}
                  placeHolder={`Enter your ${key} measurement`}
                  errorText={`Invalid ${key} measurement`}
                  //props to add on custom input
                  id={key}
                  key={key}
                  onInputChange={inputChangeHandler}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              );
            }
          })}
        </Card>
      </ScrollView>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          marginHorizontal: '2%',
          marginTop: '2%',
          flexGrow: 1,
        }}
        style={styles.buttonContainer}>
        <MainButton label="Submit" onPress={measurementHandler} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  CardContainer: {
    borderRadius: 10,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    position: 'absolute',
  },
});
export default MyMeasurementBookScreen;
