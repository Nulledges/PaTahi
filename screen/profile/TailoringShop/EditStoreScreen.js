import React, {useState, useReducer, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Card from '../../../Components/UI/Card';
import TwoLabelButton from '../../../Components/UI/CustomButton/TwoLabelButton';
import EditProfileImagePicker from '../../../Components/UI/CustomImagePicker/EditProfileImagePicker';
import * as storeActions from '../../../store/actions/store';

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
const EditStoreScreen = props => {
  const dispatch = useDispatch();
  const myStoreInformation = useSelector(state => state.store.myStore);

  const [initialStoreImage, setInitialStoreImage] = useState();
  const [initialStoreIcon, setInitialStoreIcon] = useState();
  const [storeIconName, setStoreIconName] = useState();
  const [storeImageName, setStoreImageName] = useState();
  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      imageUri: {
        storeIcon: '',
        storeImage: '',
      },
      imageFileName: {
        storeIcon: '',
        storeImage: '',
      },
      imageValidities: {
        storeIcon: false,
        storeImage: false,
      },
      imageIsValid: false,
    },
  );
  //images
  useEffect(() => {
    if (myStoreInformation === null) {
      return;
    } else {
      const downloadProfiletURI = async () => {
        const storeIcon = await storage()
          .ref(`stores/icons/` + myStoreInformation.storeIcon)
          .getDownloadURL();
        const storeImage = await storage()
          .ref(`stores/banners/` + myStoreInformation.storeImage)
          .getDownloadURL();

        dispatchImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          uriValue: storeIcon,
          fileNameValue: myStoreInformation.storeIcon,
          imageId: 'storeIcon',
        });

        dispatchImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          uriValue: storeImage,
          fileNameValue: myStoreInformation.storeImage,
          imageId: 'storeImage',
        });
        setStoreIconName(myStoreInformation.storeIcon);
        setStoreImageName(myStoreInformation.storeImage);
        setInitialStoreIcon(storeIcon);
        setInitialStoreImage(storeImage);
      };
      downloadProfiletURI();
    }
  }, [myStoreInformation]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (
              initialStoreIcon == imagePickerState.imageUri.storeIcon &&
              initialStoreImage == imagePickerState.imageUri.storeImage
            ) {
              return;
            }
            if (
              (imagePickerState.imageUri.storeIcon === '' ||
                initialStoreIcon == imagePickerState.imageUri.storeIcon) &&
              (imagePickerState.imageUri.storeImage === '' ||
                initialStoreImage == imagePickerState.imageUri.storeImage)
            ) {
            } else {
              dispatch(
                storeActions.updateStoreImages(
                  myStoreInformation.storeId,
                  storeIconName,
                  imagePickerState.imageUri.storeIcon,
                  imagePickerState.imageFileName.storeIcon,
                  storeImageName,
                  imagePickerState.imageUri.storeImage,
                  imagePickerState.imageFileName.storeImage,
                ),
              );
              props.navigation.goBack();
            }
          }}>
          <ScrollView>
            <Ionicons
              name="md-checkmark-sharp"
              size={24}
              color={
                (imagePickerState.imageUri.storeIcon === '' ||
                  initialStoreIcon == imagePickerState.imageUri.storeIcon) &&
                (imagePickerState.imageUri.storeImage === '' ||
                  initialStoreImage == imagePickerState.imageUri.storeImage)
                  ? 'rgba(0,0,0,0.2)'
                  : 'black'
              }
            />
          </ScrollView>
        </TouchableOpacity>
      ),
    });
  });
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
  return (
    <View style={styles.container}>
      <Card style={styles.storeImageContainer}>
        <Text>Store Image</Text>
        <EditProfileImagePicker
          onImageChange={imageChangeHandler}
          id="storeImage"
          imageStyle={styles.storeImagePicture}
          initialImage={initialStoreImage}
        />
      </Card>
      <Card style={styles.StoreIconContainer}>
        <Text>Store Icon</Text>
        <EditProfileImagePicker
          onImageChange={imageChangeHandler}
          id="storeIcon"
          imageStyle={styles.StoreIconPicture}
          initialImage={initialStoreIcon}
        />
      </Card>
      <Card>
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
        <TwoLabelButton
          secondTextStyle={
            myStoreInformation === null
              ? ''
              : myStoreInformation.phoneNumber === ''
              ? styles.secondTextFalseColor
              : ''
          }
          firstLabel="Phone"
          secondLabel={
            myStoreInformation === null
              ? '>'
              : myStoreInformation.phoneNumber === ''
              ? 'Set Now >'
              : myStoreInformation.phoneNumber + ' >'
          }
          onPress={() => {
            props.navigation.navigate('CHANGENUMBER', {
              userId: myStoreInformation.userId,
              phoneNumber: myStoreInformation.phoneNumber,
            });
          }}
        />
        <TwoLabelButton
          secondTextStyle={styles.secondTextTransformText}
          firstLabel="Email"
          secondLabel={
            myStoreInformation === null
              ? '>'
              : myStoreInformation.email === ''
              ? 'Set Now >'
              : myStoreInformation.email + ' >'
          }
          onPress={() => {
            props.navigation.navigate('EMAILLOGINVERIFICATION', {
              userId: myStoreInformation.userId,
              email: myStoreInformation.email,
            });
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  storeImageContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  storeImagePicture: {
    width: '100%',
    height: 125,
  },
  StoreIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  StoreIconPicture: {
    backgroundColor: '#ffffff',
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
});

export default EditStoreScreen;
