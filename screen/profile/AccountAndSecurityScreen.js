import React, {useReducer, useCallback, useEffect, useState} from 'react';
import {Keyboard, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import * as authenticationActions from '../../store/actions/authentication';
import TwoLabelButton from '../../Components/UI/CustomButton/TwoLabelButton';
import Card from '../../Components/UI/Card';
/* const UPDATE_NAME = 'UPDATE_NAME';
const nameReducer = (state, action) => {
  if (action.type === UPDATE_NAME) {
    const updatedValues = {
      ...state.nameValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.nameValidities,
      [action.input]: action.isValid,
    };
    let updatedNameIsValid = true;
    for (key in updatedValidities) {
      updatedNameIsValid = updatedNameIsValid && updatedValidities[key];
    }
    return {
      nameIsValid: updatedNameIsValid,
      nameValues: updatedValues,
      nameValidities: updatedValidities,
    };
  }
  return state;
}; */
const AccountAndSecurityScreen = props => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const userInfo = useSelector(state => state.user.myInformation);
  useEffect(() => {
    if (userInfo === undefined) {
      return;
    } else {
      let myInformation;
      for (const data in userInfo) {
        myInformation = userInfo[data];
      }

      setUserData(myInformation);
    }
  }, [userInfo]);

  /*   const [showModalName, setShowModalName] = useState(false);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [displayName, setDisplayName] = useState(); */
  /* const [showModal, setShowModalNumber] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false); */
  /*   const [placement, setPlacement] = useState();
  const [inputError, setInputError] = useState(false); */

  /*   const userAuth = auth().currentUser;
  const [initializing, setInitializing] = useState(true);
  const userId = useSelector(state => state.auth.userId); */
  /* const [nameState, dispatchNameState] = useReducer(nameReducer, {
    nameValues: {
      name: '',
    },
    nameValidities: {
      name: false,
    },
    nameIsValid: false,
  });
 */
  /* firestore()
    .collection('Users')
    .where('id', '==', userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.id);
        console.log(documentSnapshot.data() );
      });
    }); */

  /*   useEffect(() => {
    const unsubcribe = useCallback(() => {
      auth().onAuthStateChanged(user => {
        console.log(user.displayName);
        setDisplayName(user.displayName);
      });
          setEmail(userAuth.email);

      setNumber(userAuth.phoneNumber);
    }, []);
    return unsubcribe();
  }, []) */

  /*   useEffect(() => {
    const unsubcribe = () => {
      let initialize = false;
      auth().onAuthStateChanged(user => {
        if (user) {
          if (!initialize) {
            initialize = true;
            setDisplayName(user.displayName);
            console.log(user.displayName);
          }
        }
      });
    };
    return unsubcribe();
  }, []); */

  /* useEffect(
    useCallback(() => {
      const unsubsribe = () => {
        auth().onAuthStateChanged(user => {
          let mounted = false;
          if (user) {
            if (!mounted) {
              mounted = true;
              console.log(user);
              setEmail(user.email);
              setNumber(user.number);
            }
          }
        });
      };
      return unsubsribe();
    }),
  ),
    ; */

  /*   const openModalName = placement => {
    setShowModalName(true);
    setPlacement(placement);
  };
  const authenticationHandler = async () => {
    Keyboard.dismiss();
    if (!nameState.nameIsValid) {
      setInputError(true);
      return;
    } else {
      dispatch(authenticationActions.changeName(nameState.nameValues.name));
      setShowModalName(false);
    }
  };
  const inputChangeHandler = useCallback(
    (id, nameValues, nameValidities) => {
      dispatchNameState({
        type: UPDATE_NAME,
        value: nameValues,
        isValid: nameValidities,
        input: id,
      });
    },
    [dispatchNameState],
  ); */
  return (
    <Card style={styles.AccountAndSecurity}>
      <TwoLabelButton
        firstLabel="My Profile"
        secondLabel={'>'}
        onPress={() => {
          props.navigation.navigate('EDITPROFILE');
        }}
      />
      <TwoLabelButton
        secondTextStyle={styles.secondTextTransformText}
        firstLabel="Username"
        secondLabel={'Username' + '>'}
        onPress={() => {
          props.navigation.navigate('CHANGEUSERNAME');
        }}
      />
      <TwoLabelButton
        secondTextStyle={
          userData === undefined
            ? ''
            : userData.phoneNumber === ''
            ? styles.secondTextFalseColor
            : ''
        }
        firstLabel="Phone"
        secondLabel={
          userData === undefined
            ? '>'
            : userData.phoneNumber === ''
            ? 'Set Now >'
            : userData.phoneNumber + ' >'
        }
        onPress={() => {
          props.navigation.navigate('CHANGENUMBER', {
            docId: userData.docId,
            phoneNumber: userData.phoneNumber,
          });
        }}
      />
      <TwoLabelButton
        secondTextStyle={styles.secondTextTransformText}
        firstLabel="Email"
        secondLabel={
          userData === undefined
            ? '>'
            : userData.email === ''
            ? 'Set Now >'
            : userData.email + ' >'
        }
        onPress={() => {
          props.navigation.navigate('EMAILLOGINVERIFICATION', {
            docId: userData.docId,
            email: userData.email,
          });
        }}
      />
      <TwoLabelButton
        firstLabel="Change Password"
        secondLabel={'>'}
        onPress={() => {
          props.navigation.navigate('PASSWORDLOGINVERIFICATION');
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  AccountAndSecurity: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  secondTextFalseColor: {
    color: 'red',
  },
  secondTextTransformText: {
    textTransform: 'none',
  },
});

export default AccountAndSecurityScreen;
{
  /* <Box>
  <Modal
    isOpen={showModalName}
    onClose={() => setShowModalName(false)}
    avoidKeyboard
    w="100%">
    <Modal.Content maxWidth="400" width="100%" {...styles[placement]}>
      <Modal.CloseButton />
      <Modal.Header>Change Name</Modal.Header>
      <Modal.Body>
        <CustomInput
          //props send to customInput
          initialValue=""
          initiallyValid={false}
          required
          isRequired={true}
          errorOnClick={inputError}
          label="Name"
          pHolder="Enter your Name"
          errorMessage="Invalid Name"
          //props to add on custom input
          id="name"
          onInputChange={inputChangeHandler}
          returnKeyType="done"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              setShowModalName(false);
            }}>
            Cancel
          </Button>
          <Button onPress={authenticationHandler}>Save</Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>

  <Pressable
    onPress={() => {
      openModalName('bottom');
    }}>
    {({isPressed}) => {
      return (
        <Box
          mt="4"
          maxWidth="500"
          w="100%"
          maxHeight="10"
          h="10"
          overflow="hidden"
          shadow="1"
          bg="gray.400">
          <HStack justifyContent="space-between">
            <Text padding="2">Change Name</Text>
            <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
              <Text fontSize="20" numberOfLines={1} justifyContent="flex-end">
                {displayName === null ? 'Not set' : displayName}
              </Text>
            </Box>
          </HStack>
        </Box>
      );
    }}
  </Pressable>
  <Pressable onPress={() => props.navigation.navigate('CHANGE NUMBER')}>
    {({isPressed}) => {
      return (
        <Box
          mt="5"
          maxWidth="500"
          w="100%"
          maxHeight="10"
          h="10"
          overflow="hidden"
          shadow="1"
          bg="gray.400">
          <HStack justifyContent="space-between">
            <Text padding="2">Change Number</Text>
            <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
              <Text fontSize="20" numberOfLines={1} justifyContent="flex-end">
                {number === null ? 'Not set' : number}
              </Text>
            </Box>
          </HStack>
        </Box>
      );
    }}
  </Pressable>
  <Pressable onPress={() => props.navigation.navigate('CHANGE EMAIL')}>
    {({isPressed}) => {
      return (
        <Box
          mt="1"
          maxWidth="500"
          w="100%"
          maxHeight="10"
          h="10"
          overflow="hidden"
          shadow="1"
          bg="gray.400">
          <HStack justifyContent="space-between">
            <Text padding="2">Email</Text>
            <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
              <Text fontSize="20" numberOfLines={1} justifyContent="flex-end">
                {email}
              </Text>
            </Box>
          </HStack>
        </Box>
      );
    }}
  </Pressable>
  <Pressable onPress={() => props.navigation.navigate('CHANGE PASSWORD')}>
    {({isPressed}) => {
      return (
        <Box
          mt="1"
          maxWidth="500"
          w="100%"
          maxHeight="10"
          h="10"
          overflow="hidden"
          shadow="1"
          bg="gray.400">
          <HStack justifyContent="space-between">
            <Text padding="2">Change Password</Text>
            <Box width="40%" bg={isPressed ? 'gray.400' : 'white'}>
              <Text fontSize="20" numberOfLines={1} justifyContent="flex-end">
                gfdsgdfgdfgfd
              </Text>
            </Box>
          </HStack>
        </Box>
      );
    }}
  </Pressable>
</Box>;
 */
}
