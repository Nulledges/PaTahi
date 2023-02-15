import React, {useReducer, useState, useCallback} from 'react';
import {View, ScrollView, Keyboard, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import MainButton from '../../../Components/UI/CustomButton/MainButton';
import CustomImagePicker from '../../../Components/UI/CustomImagePicker/CustomImagePicker';
import CustomInputWithLabelAndLength from '../../../Components/UI/Inputs/CustomInputWithLabelAndLength';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import ErrorText from '../../../Components/UI/CustomText/ErrorText';
import * as storeActions from '../../../store/actions/store';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const IMAGE_PICKER_UPDATE = 'IMAGE_PICKER_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
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
const imagePickerReducer = (state, action) => {
  if (action.type === IMAGE_PICKER_UPDATE) {
    const updatedUri = {
      ...state.imageUri,
      [action.imageId]: action.uriValue,
    };
    const updatedFileName = {
      ...state.imageFileName,
      [action.imageId]: action.fileNameValue,
    };

    const updatedValidities = {
      ...state.imageValidities,
      [action.imageId]: action.isValid,
    };
    let updatedImageIsValid = true;
    for (key in updatedValidities) {
      updatedImageIsValid = updatedImageIsValid && updatedValidities[key];
    }
    return {
      imageUri: updatedUri,
      imageFileName: updatedFileName,
      imageValidities: updatedValidities,
      imageIsValid: updatedImageIsValid,
    };
  }
  return state;
};
const SetTailorStoreScreen = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.myInformation);
  const [inputError, setInputError] = useState(false);
  const [inputState, dispatchInputState] = useReducer(formReducer, {
    inputValues: {
      storeName: '',
      storeOwner: '',
    },
    inputValidities: {
      storeName: false,
      storeOwner: false,
    },
    formIsValid: false,
  });
  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      imageUri: {
        storeImage: '',
        storeIcon: '',
      },
      imageFileName: {
        storeImage: '',
        storeIcon: '',
      },
      imageValidities: {
        storeImage: false,
        storeIcon: false,
      },
      imageIsValid: false,
    },
  );
  const inputChangeHandler = useCallback(
    (id, inputValue, inputValidity) => {
      dispatchInputState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: id,
      });
    },
    [dispatchInputState],
  );

  const imageChangeHandler = useCallback(
    (id, uri, fileName, imageValidity) => {
      dispatchImagePickerState({
        type: IMAGE_PICKER_UPDATE,
        uriValue: uri,
        fileNameValue: fileName,
        isValid: imageValidity,
        imageId: id,
      });
    },
    [dispatchImagePickerState],
  );
  const confirmHandler = async () => {
    Keyboard.dismiss();
    if (
      !imagePickerState.imageIsValid ||
      !inputState.formIsValid ||
      userInfo.phoneNumber === '' ||
      userInfo.email === ''
    ) {
      setInputError(true);
      return;
    }

    dispatch(
      storeActions.createStore(
        inputState.inputValues.storeName,
        inputState.inputValues.storeOwner,
        imagePickerState.imageUri.storeImage,
        imagePickerState.imageFileName.storeImage,
        imagePickerState.imageUri.storeIcon,
        imagePickerState.imageFileName.storeIcon,
        userInfo.email,
        userInfo.phoneNumber,
        'I got nothin yet',
      ),
      props.navigation.navigate('ACCOUNT'),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={styles.scrollViewContainer}>
        <View style={styles.CardContainer}>
          <CustomImagePicker
            onImageChange={imageChangeHandler}
            id="storeIcon"
            imagePickerLabel="STORE ICON*"
            imageContainerStyle={styles.storeProfileIcon}
            mainImageStyle={{borderRadius: 200}}
            isError={inputError}
            textIsVisible={false}
          />
        </View>

        <View style={styles.CardContainer}>
          <CustomImagePicker
            onImageChange={imageChangeHandler}
            id="storeImage"
            imagePickerLabel="STORE IMAGE*"
            isError={inputError}
            textIsVisible={true}
          />
        </View>

        <View style={styles.CardContainer}>
          <CustomInputWithLabelAndLength
            initialValue=""
            textLength={0}
            required
            isError={inputError}
            labelText="Store Name*"
            placeHolder="Enter store name"
            errorText="Please enter store name"
            maxLength={30}
            isMultiLine={false}
            //props to add on custom input
            id="storeName"
            onInputChange={inputChangeHandler}
            returnKeyType="done"
          />
        </View>
        <View style={styles.CardContainer}>
          <CustomInputWithLabelAndLength
            initialValue=""
            textLength={0}
            required
            isError={inputError}
            labelText="Store Owner*"
            placeHolder="Enter store owner"
            errorText="Please enter store owner"
            maxLength={30}
            isMultiLine={false}
            //props to add on custom input
            id="storeOwner"
            onInputChange={inputChangeHandler}
            returnKeyType="done"
          />
        </View>
        <View style={styles.CardContainer}>
          <TwoLabelButton
            secondTextStyle={styles.secondTextTransformText}
            firstLabel="Email"
            secondLabel={
              userInfo === null
                ? '>'
                : userInfo.email === ''
                ? 'Set Now >'
                : userInfo.email + ' >'
            }
            onPress={() => {
              props.navigation.navigate('EMAILLOGINVERIFICATION', {
                userId: userInfo.userId,
                email: userInfo.email,
              });
            }}
          />

          {userInfo === null
            ? userInfo
            : !userInfo.email &&
              inputError && (
                <ErrorText
                  style={{marginRight: 10, marginVertical: 5}}
                  errorText={'Set email.'}
                />
              )}
          <TwoLabelButton
            secondTextStyle={
              userInfo === null
                ? ''
                : userInfo.phoneNumber === ''
                ? styles.secondTextFalseColor
                : ''
            }
            firstLabel="Phone"
            secondLabel={
              userInfo === null
                ? '>'
                : userInfo.phoneNumber === ''
                ? 'Set Now >'
                : userInfo.phoneNumber + ' >'
            }
            onPress={() => {
              props.navigation.navigate('CHANGENUMBER', {
                userId: userInfo.userId,
                phoneNumber: userInfo.phoneNumber,
              });
            }}
          />
          {userInfo === null
            ? userInfo
            : !userInfo.phoneNumber &&
              inputError && (
                <ErrorText
                  style={{marginRight: 10, marginVertical: 5}}
                  errorText={'Set phone number.'}
                />
              )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={confirmHandler}
          label={'CONFIRM'}
          style={{backgroundColor: 'red', borderColor: 'red'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  scrollViewContainer: {
    marginBottom: 50,
  },
  CardContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: '2%',
  },
  storeProfileIcon: {
    backgroundColor: 'grey',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
  text: {
    color: 'black',
  },
  secondTextFalseColor: {
    color: 'red',
  },
  secondTextTransformText: {
    textTransform: 'none',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    bottom: 0,
    position: 'absolute',
  },
});

export default SetTailorStoreScreen;
