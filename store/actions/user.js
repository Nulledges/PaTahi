
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import user from '../../models/user';

/* export const CREATE_NEW_USER_INFO = 'CREATE_NEW_USER_INFO'; */
export const SET_USER_INFO = 'SET_USER_INFO';
/* export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'; */

export const fetchUserData = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('Users')
    .doc(userId)
    .onSnapshot(documentSnapshot => {
      const userId = documentSnapshot.id;
      let userData = documentSnapshot.data();
      /* const UserInformation = []; */
      userData.userId = userId;

      /* UserInformation.push(
        new user(
          userId,
          userData.email,
          userData.isTailor,
          userData.name,
          userData.phoneNumber,
          userData.profileBanner,
          userData.profileIcon,
          userData.username,
        ),
      );
 */
      dispatch({
        type: SET_USER_INFO,
        userInfo: userData,
      });
    });
};

export const updatePhoneNumber = (PhoneNumber, userId) => {
  return (dispatch, getState) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({phoneNumber: parseInt(PhoneNumber)})
      .then(() => {
        console.log('User updated!');
      });
  };
};
export const updateUsername = (username, userId) => {
  return (dispatch, getState) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({username: username})
      .then(() => {
        console.log('User updated!');
      });
  };
};
export const updateFullname = (fullname, userId) => {
  return (dispatch, getState) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({name: fullname})
      .then(() => {
        console.log('User updated!');
      });
  };
};
export const updateProfileImages = (
  userId,
  profileIconInitialFilename,
  profileIconUri,
  profileIconFilename,
  profileBannerInitialFilename,
  profileBannerUri,
  profileBannerFilename,
) => {
  return (dispatch, getState) => {
    //uploadImages
    if (profileIconInitialFilename === profileIconFilename) {
    } else {
      storage()
        .ref(`profile/${profileIconFilename}`)
        .putFile(profileIconUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
    }
    if (profileBannerInitialFilename === profileBannerFilename) {
    } else {
      storage()
        .ref(`profile/${profileBannerFilename}`)
        .putFile(profileBannerUri)
        .on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
    }
    //delete images
    if (
      profileIconInitialFilename === 'defaultProfileIcon.png' ||
      profileIconInitialFilename === profileIconFilename
    ) {
    } else {
      storage().ref(`profile/${profileIconInitialFilename}`).delete();
    }

    if (
      profileBannerInitialFilename === 'defaultProfileBanner.jpg' ||
      profileBannerInitialFilename === profileBannerFilename
    ) {
    } else {
      storage().ref(`profile/${profileBannerInitialFilename}`).delete();
    }
    setTimeout(async () => {
      if (
        profileIconFilename == '' ||
        profileIconInitialFilename === profileIconFilename
      ) {
      } else {
        firestore().collection('Users').doc(userId).update({
          profileIcon: profileIconFilename,
        });
      }

      if (
        profileBannerFilename == '' ||
        profileBannerInitialFilename === profileBannerFilename
      ) {
      } else {
        firestore().collection('Users').doc(userId).update({
          profileBanner: profileBannerFilename,
        });
      }
    }, 1750);
  };
};
