import {ToastAndroid} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token, userType) => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      userType: userType,
    });
  };
};
export const loginWithEmailandPassword = (email, password) => {
  return async dispatch => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          ToastAndroid.showWithGravity(
            'Invalid email or password!',
            2,
            ToastAndroid.CENTER,
          );
        }
      })
      .then(() => {
        let initialize = false;
        const unsubcribe = auth().onAuthStateChanged(user => {
          if (user) {
            if (!initialize) {
              initialize = true;
              firestore()
                .collection('Users')
                .where('id', '==', user.uid)
                .get()
                .then(documentSnapshot => {
                  documentSnapshot.docs.forEach(item => {
                  
                    auth()
                      .currentUser.getIdTokenResult()
                      .then(idTokenResult => {
                        dispatch(
                          authenticate(
                            user.uid,
                            idTokenResult.token,
                            item.data().userType,
                          ),
                        );
                      });
                  });
                });
            }
          }
        });
        return unsubcribe();
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
                firestore()
                  .collection('Users')
                  .add({
                    id: user.uid,
                    email: user.email,
                    name: '',
                    phoneNumber: '',
                    userType: 'User',
                  })
                  .then(() => {
                    firestore()
                      .collection('Users')
                      .where('id', '==', user.uid)
                      .get()
                      .then(documentSnapshot => {
                        documentSnapshot.docs.forEach(item => {
                          auth()
                            .currentUser.getIdTokenResult()
                            .then(idTokenResult => {
                              dispatch(
                                authenticate(
                                  user.uid,
                                  idTokenResult.token,
                                  item.data().userType,
                                ),
                              );
                            });
                        });
                      });
                  });
              }
            }
          });
        };
        return unsubcribe();
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.showWithGravity(
            'Invalid email.',
            2,
            ToastAndroid.CENTER,
          );
        } else if (error.code === 'auth/weak-password') {
          ToastAndroid.showWithGravity(
            'Password must be 6 characters or longer.',
            2,
            ToastAndroid.CENTER,
          );
        } else if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.showWithGravity(
            'Email address already taken.',
            2,
            ToastAndroid.CENTER,
          );
        }
      });
  };
};
export const forgotPassword = email => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      ToastAndroid.showWithGravity('Check your Email!', 2, ToastAndroid.CENTER);
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        ToastAndroid.showWithGravity('Invalid Email!', 2, ToastAndroid.CENTER);
      } else if (error.code === 'auth/user-not-found') {
        ToastAndroid.showWithGravity('User not found!', 2, ToastAndroid.CENTER);
      } else if (error.code === 'auth/too-many-requests') {
        ToastAndroid.showWithGravity(
          'Too many request try again later!.',
          2,
          ToastAndroid.CENTER,
        );
      }
    });
};
export const changeName = name => {
  return async dispatch => {
    await auth().currentUser.updateProfile({displayName: name});
  };
};
export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  return {type: LOGOUT};
};
