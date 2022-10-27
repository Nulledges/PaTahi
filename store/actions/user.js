import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import user from '../../models/user';
import {useNavigation} from '@react-navigation/native';
/* export const CREATE_NEW_USER_INFO = 'CREATE_NEW_USER_INFO'; */
export const SET_USER_INFO = 'SET_USER_INFO';
/* export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'; */

export const fetchUserData = (dispatch, getState) => {
  const userId = getState().auth.userId;
  firestore()
    .collection('Users')
    .where('id', '==', userId)
    .onSnapshot(documentSnapshot => {
      const UserInformation = [];
      documentSnapshot.docs.forEach(item => {
        const userData = item.data();
        UserInformation.push(
          new user(
            item.id,
            userData.email,
            userData.id,
            userData.isTailor,
            userData.name,
            userData.phoneNumber,
            userData.profileBanner,
            userData.profileIcon,
            userData.username,
          ),
        );
      });
      dispatch({
        type: SET_USER_INFO,
        userInfo: UserInformation,
      });
    });
};

export const updatePhoneNumber = (PhoneNumber, docId) => {
  console.log(PhoneNumber);
  return (dispatch, getState) => {
    firestore()
      .collection('Users')
      .doc(docId)
      .update({phoneNumber: parseInt(PhoneNumber)})
      .then(() => {
        console.log('User updated!');
      });
  };
};
