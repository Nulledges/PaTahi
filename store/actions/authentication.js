import {ToastAndroid, Alert} from 'react-native';

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
      .then(() => {
        let initialize = false;
        const unsubcribe = auth().onAuthStateChanged(user => {
          if (user) {
            if (!initialize) {
              initialize = true;
              firestore()
                .collection('Users')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                  const userData = documentSnapshot.data();
                  auth()
                    .currentUser.getIdTokenResult()
                    .then(idTokenResult => {
                      dispatch(
                        authenticate(
                          user.uid,
                          idTokenResult.token,
                          userData.userType,
                        ),
                      );
                    });
                });
              /*   firestore()
                .collection('Users')
                where('id' '===' user.uid)
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
                }); */
            }
          }
        });
        return unsubcribe();
      })
      .catch(error => {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          Alert.alert('Error!', 'Invalid email or password!');
        }
      });
  };
};
export const signupWithEmailandPassword = (
  email,
  password,
  fullname,
  username,
) => {
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
                  .doc(user.uid)
                  .set({

                    email: user.email,
                    isTailor: false,
                    name: fullname,
                    phoneNumber: '',
                    profileBanner: 'defaultProfileBanner.jpg',
                    profileIcon: 'defaultProfileIcon.png',
                    userType: 'User',
                    username: username,
                  })
                  .then(() => {
                    firestore()
                      .collection('Users')
                      .doc(user.uid)
                      .get()
                      .then(documentSnapshot => {
                        const userData = documentSnapshot.data();
                        auth()
                          .currentUser.getIdTokenResult()
                          .then(idTokenResult => {
                            dispatch(
                              authenticate(
                                user.uid,
                                idTokenResult.token,
                                userData.userType,
                              ),
                            );
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
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert('Error!', 'Invalid email.');
            break;
          case 'auth/weak-password':
            Alert.alert('Error!', 'Password must be 6 characters or longer.');
            break;
          case 'auth/email-already-in-use':
            Alert.alert('Error!', 'Email address already taken.');
            break;
        }
      });
  };
};
export const forgotPassword = email => {
  return async dispatch => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Sent successfully!', 'Please check your email!', [
          {text: 'Okay'},
        ]);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert('Error!', 'Invalid email.');
            break;
          case 'auth/user-not-found':
            Alert.alert('Error!', 'User not found.');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Error!', 'Too many request try again later.');
            break;
        }
      });
  };
};
export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  return {type: LOGOUT};
};
