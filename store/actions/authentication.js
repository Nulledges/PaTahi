import {Alert} from 'react-native';
import {Toast} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
};
export const loginWithEmailandPassword = (email, password) => {
  return async dispatch => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const unsubcribe = () => {
          let initialize = false;
          auth().onAuthStateChanged(user => {
            if (user) {
              if (!initialize) {
                initialize = true;
                auth()
                  .currentUser.getIdTokenResult()
                  .then(idTokenResult => {
                    dispatch(authenticate(user.uid, idTokenResult.token));
                  });
              }
            }
          });
        };
        return unsubcribe();
      })
      .catch(error => {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          Toast.show({
            title: 'Login error!',
            status: 'warning',
            description: 'Invalid email or password!',
            placement: 'bottom',
          });
        }
      });
  };
};

export const signupWithEmailandPassword = (email, password) => {
  return async dispatch => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const unsubcribe = () => {
          let initialize = false;
          auth().onAuthStateChanged(user => {
            if (user) {
              if (!initialize) {
                initialize = true;
                console.log('once more');
                firestore()
                  .collection('Users')
                  .add({
                    Id: user.uid,
                    name: '',
                    phoneNumber: '',
                  })
                  .then(doc => {});
              }
            }
          });
        };
        return unsubcribe();
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Toast.show({
            title: 'Signup error!',
            status: 'warning',
            description: 'Invalid email.',
            placement: 'bottom',
          });
        } else if (error.code === 'auth/weak-password') {
          Toast.show({
            title: 'Signup error!',
            status: 'warning',
            description: 'Password must be 6 characters or longer.',
            placement: 'bottom',
          });
        } else if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            title: 'Signup error!',
            status: 'warning',
            description: 'Email address already taken.',
            placement: 'bottom',
          });
        }
      });
  };
};
export const changeName = name => {
  return async dispatch => {
    await auth().currentUser.updateProfile({displayName: name});
  };
};
//LOGOUT USER
export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  return {type: LOGOUT};
};
