import React, {useEffect, useState, useReducer, useCallback} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import Card from '../../Components/UI/Card';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import EditProfileImagePicker from '../../Components/UI/CustomImagePicker/EditProfileImagePicker';
import * as userActions from '../../store/actions/user';
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
const EditProfileScreen = props => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [initialProfileBanner, setInitialProfileBanner] = useState();
  const [initialProfileIcon, setInitialProfileIcon] = useState();
  const [profileIconName, setProfileIconName] = useState();
  const [profileBannerName, setProfileBannerName] = useState();
  const userInfo = useSelector(state => state.user.myInformation);
  const [imagePickerState, dispatchImagePickerState] = useReducer(
    imagePickerReducer,
    {
      imageUri: {
        profileIcon: '',
        profileBanner: '',
      },
      imageFileName: {
        profileIcon: '',
        profileBanner: '',
      },
      imageValidities: {
        profileIcon: false,
        profileBanner: false,
      },
      imageIsValid: false,
    },
  );

  //userData
  /*   useEffect(() => {
    if (userInfo === undefined) {
      return;
    } else {
      let myInformation;
      for (const data in userInfo) {
        myInformation = userInfo[data];
      }

      setUserData(myInformation);
    }
  }, [userInfo]); */

  //images
  useEffect(() => {
    if (userInfo === null) {
      return;
    } else {
      const downloadProfiletURI = async () => {
        const icon = await storage()
          .ref(`profile/` + userInfo.profileIcon)
          .getDownloadURL();
        const banner = await storage()
          .ref(`profile/` + userInfo.profileBanner)
          .getDownloadURL();

        dispatchImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          uriValue: icon,
          fileNameValue: userInfo.profileIcon,
          imageId: 'profileIcon',
        });

        dispatchImagePickerState({
          type: IMAGE_PICKER_UPDATE,
          uriValue: banner,
          fileNameValue: userInfo.profileBanner,
          imageId: 'profileBanner',
        });
        setProfileIconName(userInfo.profileIcon);
        setProfileBannerName(userInfo.profileBanner);
        setInitialProfileIcon(icon);
        setInitialProfileBanner(banner);
      };
      downloadProfiletURI();
    }
  }, [userInfo]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (
              initialProfileIcon == imagePickerState.imageUri.profileIcon &&
              initialProfileBanner == imagePickerState.imageUri.profileBanner
            ) {
              return;
            }
            if (
              (imagePickerState.imageUri.profileIcon === '' ||
                initialProfileIcon == imagePickerState.imageUri.profileIcon) &&
              (imagePickerState.imageUri.profileBanner === '' ||
                initialProfileBanner == imagePickerState.imageUri.profileBanner)
            ) {
            } else {
              dispatch(
                userActions.updateProfileImages(
                  userInfo.userId,
                  profileIconName,
                  imagePickerState.imageUri.profileIcon,
                  imagePickerState.imageFileName.profileIcon,
                  profileBannerName,
                  imagePickerState.imageUri.profileBanner,
                  imagePickerState.imageFileName.profileBanner,
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
                (imagePickerState.imageUri.profileBanner === '' ||
                  initialProfileBanner ==
                    imagePickerState.imageUri.profileBanner) &&
                (imagePickerState.imageUri.profileIcon === '' ||
                  initialProfileIcon == imagePickerState.imageUri.profileIcon)
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
    <View style={styles.EditProfileScreen}>
      <View style={styles.ImageContainer}>
        <EditProfileImagePicker
          onImageChange={imageChangeHandler}
          id="profileIcon"
          imageStyle={styles.ProfilePicture}
          initialImage={initialProfileIcon}
        />

        <EditProfileImagePicker
          onImageChange={imageChangeHandler}
          id="profileBanner"
          imageStyle={styles.Profilebanner}
          initialImage={initialProfileBanner}
        />
        <View style={styles.ProfilebannerTextContainer}>
          <Text style={styles.ProfilebannerText}>Tap to change</Text>
        </View>
      </View>
      <Card style={{marginTop: 15}}>
        <TwoLabelButton
          secondTextStyle={
            userInfo === null
              ? '>'
              : userInfo.name === ''
              ? styles.secondTextFalseColor
              : ''
          }
          firstLabel="Name"
          secondLabel={
            userInfo === null
              ? '>'
              : userInfo.name === ''
              ? 'SET NOW >'
              : userInfo.name + ' >'
          }
          onPress={() => {
            props.navigation.navigate('EDITNAME', {
              userId: userInfo.userId,
              fullname: userInfo.name,
            });
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  EditProfileScreen: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  ImageContainer: {
    width: '100%',
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfilePicture: {
    backgroundColor: '#ffffff',
    borderRadius: 200,
    height: 55,
    width: 55,
    position: 'absolute',
    zIndex: 1000,
  },
  ProfilePictureImagePicker: {
    backgroundColor: 'transparent',
    borderRadius: 200,
    height: 55,
    width: 55,
    position: 'absolute',
    zIndex: 1000,
  },
  ProfileText: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 10,
    position: 'absolute',
    fontWeight: 'bold',
    zIndex: 200,
    color: 'black',
  },
  Profilebanner: {
    width: '100%',
    height: 125,
    zIndex: 200,
  },
  ProfilebannerImagePicker: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: 125,
    zIndex: 200,
  },
  ProfilebannerTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1000,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  ProfilebannerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  secondTextFalseColor: {
    color: 'red',
  },
});

export default EditProfileScreen;
