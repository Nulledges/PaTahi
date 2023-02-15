import React, {useReducer, useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet, Keyboard} from 'react-native';
import CustomImagePicker from '../../../Components/UI/CustomImagePicker/CustomImagePicker';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../../../Components/UI/Card';
import MainButton from '../../../Components/UI/CustomButton/MainButton';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import * as storeApplicationAction from '../../../store/actions/storeApplication';

//To avoid Spelling Mistakes
const IMAGE_PICKER_UPDATE = 'IMAGE_PICKER_UPDATE';

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
  const dispatch = useDispatch();
  const myStoreInformation = useSelector(state => state.store.myStore);
  const [inputError, setInputError] = useState(false);
  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      imageUri: {
        businessPermitImage: '',
      },
      imageFileName: {
        businessPermitImage: '',
      },
      imageValidities: {
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

  const storeApplicationHandler = async () => {
    Keyboard.dismiss();
    if (!imagePickerState.imageIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(
        storeApplicationAction.createStoreVerification(
          myStoreInformation.storeId,
          myStoreInformation.storeName,
          myStoreInformation.storeOwner,
          imagePickerState.imageUri.businessPermitImage,
          imagePickerState.imageFileName.businessPermitImage,
        ),
      );
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollViewContainer}>
        <Card style={styles.cardContainer}>
          <TwoLabelButton
            secondTextStyle={styles.secondTextTransformText}
            firstLabel="Store Name"
            secondLabel={
              myStoreInformation === null
                ? '>'
                : myStoreInformation.storeName === ''
                ? 'Set Now >'
                : myStoreInformation.storeName + ' >'
            }
            onPress={() => {
              props.navigation.navigate('CHANGE STORE NAME', {
                storeId: myStoreInformation.storeId,
                storeName: myStoreInformation.storeName,
              });
            }}
          />
          <TwoLabelButton
            secondTextStyle={styles.secondTextTransformText}
            firstLabel="Store owner"
            secondLabel={
              myStoreInformation === null
                ? '>'
                : myStoreInformation.storeOwner === ''
                ? 'Set Now >'
                : myStoreInformation.storeOwner + ' >'
            }
            onPress={() => {
              props.navigation.navigate('CHANGE OWNER NAME', {
                storeId: myStoreInformation.storeId,
                storeOwner: myStoreInformation.storeOwner,
              });
            }}
          />
        </Card>
        <Card style={styles.cardContainer}>
          <CustomImagePicker
            onImageChange={imageChangeHandler}
            id="businessPermitImage"
            imagePickerLabel="BUSINESS PERMIT IMAGE*"
            isError={inputError}
          />
        </Card>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MainButton label="SUBMIT" onPress={storeApplicationHandler} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  ScrollViewContainer: {
    marginBottom: 50,
  },
  cardContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 125,
  },
  storeImageContainer: {
    width: '100%',
    height: 125,
    position: 'absolute',
    zIndex: -1000,
  },
  storeImage: {
    height: '100%',
    width: '100%',
  },
  storeIconContainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
  },
  storeIcon: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 200,
    height: 55,
    width: 55,
  },
  secondTextFalseColor: {
    color: 'red',
  },
  secondTextTransformText: {
    textTransform: 'none',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    bottom: 0,
    position: 'absolute',
  },
});

export default ApplicationFormScreen;
