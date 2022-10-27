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
  ScrollView,
} from 'react-native';
import CustomImagePicker from '../../../Components/UI/CustomImagePicker/CustomImagePicker';
import {useDispatch} from 'react-redux';
import Card from '../../../Components/UI/Card';
import CustomInputWithLabel from '../../../Components/UI/Inputs/CustomInputWithLabel';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import {useSelector} from 'react-redux';
import * as storeApplicationAction from '../../../store/actions/storeApplication';
//To avoid Spelling Mistakes
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
    let updatedSellonIsValid = true;
    for (key in updatedValidities) {
      updatedSellonIsValid = updatedSellonIsValid && updatedValidities[key];
    }
    return {
      imageUri: updatedUri,
      imageFileName: updatedFileName,
      imageValidities: updatedValidities,
      imageIsValid: updatedSellonIsValid,
    };
  }
  return state;
};
const ApplicationFormScreen = props => {
  const applicationInformation = props.route.params;

  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();

  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      imageUri: {
        storeImage: '',
        businessPermitImage: '',
      },
      imageFileName: {
        storeImage: '',
        businessPermitImage: '',
      },
      imageValidities: {
        storeImage: false,
        businessPermitImage: false,
      },
      imageIsValid: false,
    },
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

  const [inputState, dispatchInputState] = useReducer(formReducer, {
    inputValues: {
      storeName: '',
    },
    inputValidities: {
      storeName: false,
    },
    formIsValid: false,
  });
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
  const storeApplicationHandler = async () => {
    Keyboard.dismiss();
    if (!imagePickerState.imageIsValid || !inputState.formIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(
        storeApplicationAction.createTailorApplication(
          imagePickerState.imageUri.storeImage,
          imagePickerState.imageFileName.storeImage,
          imagePickerState.imageUri.businessPermitImage,
          imagePickerState.imageFileName.businessPermitImage,
          inputState.inputValues.storeName,
        ),
      );
    }
  };
  console.log(imagePickerState.imageUri);
  return (
    <View style={styles.SellOnPatahiScreen}>
      <Card style={styles.SellOnPatahiScreenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollViewContainer}>
          <CustomImagePicker
            onImageChange={imageChangeHandler}
            id="storeImage"
            imagePickerLabel="STORE IMAGE*"
          />
          <CustomImagePicker
            onImageChange={imageChangeHandler}
            id="businessPermitImage"
            imagePickerLabel="BUSINESS PERMIT IMAGE*"
          />
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <CustomInputWithLabel
                //props send to customInput
                initialValue=""
                initiallyValid={false}
                required
                isError={inputError}
                labelText="STORE NAME*"
                placeHolder="Enter your Store Name"
                errorText="Store Name!"
                //props to add on custom input
                id="storeName"
                onInputChange={inputChangeHandler}
                returnKeyType="done"
              />
            </View>
            {/*            <View>
              <CustomInputWithLabel
                //props from customInput
                initialValue=""
                initiallyValid={false}
                required
                isError={inputError}
                labelText="FULL NAME*"
                placeHolder="Enter your Full Name"
                errorText="Invalid Full Name"
                //props to add on custom input
                id="fullName"
                onInputChange={inputChangeHandler}
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View> */}
          </View>

          <MainButton label="SUBMIT" onPress={storeApplicationHandler} />
        </ScrollView>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  SellOnPatahiScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  SellOnPatahiScreenContainer: {
    width: '100%',
    height: '95%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScrollViewContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 10,
  },
});

export default ApplicationFormScreen;
